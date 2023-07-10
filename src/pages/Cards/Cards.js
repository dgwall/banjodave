import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import filterSimilarProducts from "../../components/menus/filterSimilarProducts";
import Card from "../../components/items/Card";
import CardExpanded from "../../components/items/CardExpanded";
import "./Cards.css";
import { cardThemes } from "./cardThemes";
import { getButtonColor, darkenColor } from "../../components/utils/colorUtils";

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
  const [viewMode, setViewMode] = useState("newest");

  // get card id from the url
  const { cardId } = useParams();

  // function for navigation
  const navigate = useNavigate();

  const sortCards = useCallback(
    (cards) => {
      switch (viewMode) {
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
    },
    [selectedCard, viewMode]
  );

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

  // sort the cards when viewMode changes
  useEffect(() => {
    const sortedCards = sortCards(cards);
    setSimilarCards(sortedCards);
    setCurrentPage(1);
  }, [selectedCard, cards, viewMode, sortCards]);

  // handle changes in cardId
  useEffect(() => {
    if (cards.length && cardId) {
      const card = cards.find((card) => card.id.toString() === cardId);
      setSelectedCard(card);
    }
  }, [cards, cardId]);

  // handler for card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setViewMode("similar");
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Calculate colors
  const selectedTheme = selectedCard ? getTheme(selectedCard.theme) : {};
  const buttonTextColor = getButtonColor(selectedTheme.hl);
  const hlAColor = darkenColor(selectedTheme.hl, 10);
  const hlBColor = darkenColor(selectedTheme.hl, 30);

  // calculate the beginning and end index for pagination
  const begin = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = begin + ITEMS_PER_PAGE;

  return (
    <div style={{ width: "100%" }}>
      {selectedCard && (
        <div
          className="card-selected"
          style={{
            "--bg-color": selectedTheme?.bg,
            "--bg-a-color": selectedTheme?.bg,
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
        {selectedCard && (
          <button
            onClick={() => setViewMode("similar")}
            disabled={viewMode === "similar" ? true : false}
          >
            Similar
          </button>
        )}
        <button
          onClick={() => setViewMode("newest")}
          disabled={viewMode === "newest" ? true : false}
        >
          Newest
        </button>
        <button
          onClick={() => setViewMode("alphabetical")}
          disabled={viewMode === "alphabetical" ? true : false}
        >
          A-Z
        </button>
        <button
          onClick={() => setViewMode("shuffle")}
          disabled={viewMode === "shuffle" ? true : false}
        >
          Random
        </button>
      </div>
    </div>
  );
}

export default Cards;
