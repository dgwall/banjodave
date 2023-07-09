import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import filterSimilarProducts from "../../components/menus/filterSimilarProducts";
import Card from "../../components/items/Card";
import CardExpanded from "../../components/items/CardExpanded";
import "./Cards.css";
import { cardThemes } from "./cardThemes";

const ITEMS_PER_PAGE = 6;

const getTheme = (themeName) => {
  return cardThemes.find((theme) => theme.name === themeName) || {};
};

function Cards() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [similarCards, setSimilarCards] = useState([]);
  const [viewMode, setViewMode] = useState("suggested");

  // get card id from the url
  const { cardId } = useParams();

  // function for navigation
  const navigate = useNavigate();

  // fetch data and set state when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/PSYCHOGORILLA.json");
      const data = await response.json();
      const sortedData = data.sort((b, a) => a.date.localeCompare(b.date));
      setCards(sortedData);
      setSimilarCards(sortedData);
      setTotalPages(Math.ceil(sortedData.length / ITEMS_PER_PAGE));
    };

    fetchData();
  }, []);

  // handle changes in cardId
  useEffect(() => {
    if (cards.length && cardId) {
      const card = cards.find((card) => card.id.toString() === cardId);
      setSelectedCard(card);
    }
  }, [cards, cardId]);

  // get similar cards when selected card or all cards change
  useEffect(() => {
    if (selectedCard) {
      if (viewMode === "newest") {
        setSimilarCards(cards);
      } else {
        const similarItems = filterSimilarProducts(cards, selectedCard);
        setSimilarCards(similarItems);
      }
      setCurrentPage(1);
    }
  }, [selectedCard, cards, viewMode]);

  // handler for card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setCurrentPage(1);
    navigate(`/cards/${card.id}`);
  };

  // handler for back button
  const handleBack = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // handler for forward button
  const handleForward = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // handler for viewMode button
  const handleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "newest" ? "suggested" : "newest"));
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleShuffle = () => {
    const shuffled = shuffleArray([...similarCards]);
    setSimilarCards(shuffled);
    setCurrentPage(1);
  };

  // calculate the beginning and end index for pagination
  const begin = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = begin + ITEMS_PER_PAGE;

  // function to calculate brightness
  function getBrightness(color = "") {
    // strip the leading # if it's there
    color = color.replace("#", "");

    // convert r, g, b to numerical values
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // calculate brightness
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  // function to get button color based on background color
  function getButtonColor(bgColor) {
    // calculate brightness
    const brightness = getBrightness(bgColor);

    // return black or white based on brightness
    return brightness > 155 ? "black" : "white";
  }

  // find current theme
  const selectedTheme = selectedCard ? getTheme(selectedCard.theme) : {};

  // get button color
  const buttonTextColor = getButtonColor(selectedTheme.hl);

  // get darker highlight colors
  const hlAColor = darkenColor(selectedTheme.hl, 10);
  const hlBColor = darkenColor(selectedTheme.hl, 30);

  function darkenColor(color, percent) {
    if (!color) {
      return "#000000"; // fallback color
    }
    color = color.substr(1); // remove '#'

    const num = parseInt(color, 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00ff) - amt,
      B = (num & 0x0000ff) - amt;

    const newColor = (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1);
    return "#" + newColor;
  }

  return (
    <div style={{ width: "100%" }}>
      {selectedCard && (
        <div
          className="card-selected"
          style={{
            "--bg-color": selectedTheme?.bg,
            "--fg-color": selectedTheme?.fg,
            "--hl-color": selectedTheme?.hl,
            "--bt-color": buttonTextColor,
            "--hl-a-color": hlAColor,
            "--hl-b-color": hlBColor,
          }}
        >
          <CardExpanded data={selectedCard} />
        </div>
      )}

      <div className="cards-container">
        {similarCards.slice(begin, end).map((card, index) => (
          <React.Fragment key={card.id}>
            <div onClick={() => handleCardClick(card)}>
              <Card data={card} />
            </div>
            {index === Math.floor(ITEMS_PER_PAGE / 2) - 1 && (
              <div className="break">&nbsp;</div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="view-buttons">
        <button
          onClick={handleBack}
          disabled={currentPage === 1 ? true : false}
        >
          &lt;
        </button>

        <button
          onClick={handleForward}
          disabled={currentPage === totalPages - 1 ? true : false}
        >
          &gt;
        </button>
      </div>

      <div className="view-buttons">
        <button onClick={handleViewMode}>
          {viewMode === "newest" ? "view similar" : "view newest"}
        </button>
        <button onClick={handleShuffle}>shuffle!</button>
      </div>
    </div>
  );
}

export default Cards;
