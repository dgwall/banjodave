import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/items/Card";
import CardExpanded from "../../components/items/CardExpanded";
import "./Cards.css";
import { cardThemes } from "./cardThemes";
import { getButtonColor, darkenColor } from "../../components/utils/colorUtils";
import {
  fetchCards,
  sortCards,
  searchCards,
} from "../../components/menus/CardService";

const ITEMS_HOMEPAGE = 12;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [isSearchFocused, setSearchFocused] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    let searchInterval;
    if (isSearchFocused && searchTerm !== lastSearch) {
      searchInterval = setTimeout(() => {
        const searchedCards = searchCards(cards, searchTerm);
        setSimilarCards(searchedCards);
        setViewMode("search");
        setLastSearch(searchTerm);
      }, 1000);
    }
    return () => clearTimeout(searchInterval);
  }, [searchTerm, lastSearch, isSearchFocused, cards]);

  // get card id from the url
  const { cardId } = useParams();

  // function for navigation
  const navigate = useNavigate();

  // fetch data and set state when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const { cards, totalPages } = await fetchCards();
      setCards(cards);
      setSimilarCards(cards);
      setTotalPages(totalPages);
    };

    fetchData();
  }, []);

  // sort the cards when viewMode changes
  useEffect(() => {
    const sortedCards = sortCards(cards, viewMode, selectedCard, searchTerm);
    setSimilarCards(sortedCards);
    setCurrentPage(1);
  }, [selectedCard, cards, viewMode, searchTerm]);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      const searchedCards = searchCards(cards, searchTerm);
      setSimilarCards(searchedCards);
      setViewMode("search");
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  // Calculate colors
  const selectedTheme = selectedCard ? getTheme(selectedCard.theme) : {};
  const buttonTextColor = getButtonColor(selectedTheme.hl);
  const hlAColor = darkenColor(selectedTheme.hl, 10);
  const hlBColor = darkenColor(selectedTheme.hl, 30);

  // calculate total pages for pagination
  useEffect(() => {
    selectedCard
      ? setTotalPages(Math.ceil(similarCards.length / ITEMS_PER_PAGE))
      : setTotalPages(Math.ceil(similarCards.length / ITEMS_HOMEPAGE));
  }, [similarCards, selectedCard]);

  // calculate the beginning and end index for pagination
  const begin = selectedCard
    ? (currentPage - 1) * ITEMS_PER_PAGE
    : (currentPage - 1) * ITEMS_HOMEPAGE;
  const end = selectedCard ? begin + ITEMS_PER_PAGE : begin + ITEMS_HOMEPAGE;

  return (
    <>
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

      <div className="view-buttons">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyPress}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          placeholder="Search..."
          ref={searchInputRef}
        />
      </div>

      <div className="view-buttons">
        {selectedCard && (
          <button
            onClick={() => {
              setViewMode("similar");
              setSearchTerm("");
            }}
            disabled={viewMode === "similar" ? true : false}
          >
            Similar
          </button>
        )}
        <button
          onClick={() => {
            setViewMode("newest");
            setSearchTerm("");
          }}
          disabled={viewMode === "newest" ? true : false}
        >
          Newest
        </button>
        <button
          onClick={() => {
            setViewMode("shuffle");
            setSearchTerm("");
          }}
          disabled={viewMode === "shuffle" ? true : false}
        >
          Random
        </button>
      </div>

      <div className="cards-container">
        {similarCards.slice(begin, end).map((card, index) => (
          <div onClick={() => handleCardClick(card)} key={card.id}>
            <Card data={card} />
          </div>
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
          disabled={currentPage === totalPages ? true : false}
        >
          &gt;
        </button>
      </div>
    </>
  );
}

export default Cards;
