import filterSimilarProducts from "../../components/menus/filterSimilarProducts";

const ITEMS_PER_PAGE = 6;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Search for cards
export function searchCards(cards, searchTerm) {
  if (!searchTerm) return [...cards];

  const term = searchTerm.toLowerCase();
  const hits = cards.map((card) => {
    let hitCount = 0;
    const regex = new RegExp(`\\b${term}\\b`, "i"); // Matches the whole word

    if (card.id && regex.test(card.id)) hitCount += 8;
    if (card.title && regex.test(card.title)) hitCount += 4;
    if (card.tagline && regex.test(card.tagline)) hitCount += 2;
    if (card.tags && card.tags.some((tag) => tag.toLowerCase() === term))
      hitCount += 10;

    // Original scoring for partial matches
    if (card.id && card.id.toLowerCase().includes(term)) hitCount += 8;
    if (card.title && card.title.toLowerCase().includes(term)) hitCount += 6;
    if (card.tagline && card.tagline.toLowerCase().includes(term))
      hitCount += 4;
    if (card.tags && card.tags.some((tag) => tag.toLowerCase().includes(term)))
      hitCount += 2;
    if (card.text)
      card.text.forEach((textBlock) => {
        if (textBlock.toLowerCase().includes(term)) hitCount++;
      });

    return {
      ...card,
      __hitCount: hitCount,
    };
  });

  return hits
    .filter((card) => card.__hitCount > 0)
    .sort((a, b) => b.__hitCount - a.__hitCount)
    .map(({ __hitCount, ...card }) => card); // remove hitCount from returned cards
}

// Sort cards by given viewMode
export function sortCards(cards, viewMode, selectedCard, searchTerm) {
  switch (viewMode) {
    case "search":
      return searchCards(cards, searchTerm);
    case "similar":
      return filterSimilarProducts(cards, selectedCard);
    case "alphabetical":
      return [...cards].sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
      return [...cards];
    case "shuffle":
      return shuffleArray([...cards]);
    default:
      return cards;
  }
}

// Fetch card data from server
export async function fetchCards() {
  const response = await fetch("/PSYCHOGORILLA.json");
  const data = await response.json();

  // First sort by ID
  const sortedByIdData = data.sort((a, b) => a.id.localeCompare(b.id));

  // Then sort by date
  const sortedData = sortedByIdData.sort((b, a) =>
    a.date.localeCompare(b.date)
  );

  // Calculate total pages for pagination
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  return { cards: sortedData, totalPages };
}

// Tag cloud
export function getTopTags(cards) {
  const tagCounts = {};

  cards.forEach((card) => {
    if (card.tags) {
      card.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  const tagCountsArray = Object.entries(tagCounts);

  const topTags = tagCountsArray
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([name, count]) => ({ name, count })); // Keep track of tag name and count

  return topTags;
}
