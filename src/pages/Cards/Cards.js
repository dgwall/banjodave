// TODO: All images to webp

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

const ITEMS_HOMEPAGE = 30;
const ITEMS_PER_PAGE = 8;

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
      }, 500);
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
    setSearchTerm("");
    navigate(`/cards/${card.id}`);
  };

  // handler for page buttons
  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    setCurrentPage(totalPages);
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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
      {selectedCard ? (
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
      ) : (
        <>
          <h1>digital banjeetz card collection</h1>
          {cards.length} cards 0 crypto
        </>
      )}

      <div className="view-buttons">
        <input
          type="text"
          name="search"
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
            <img src="/img/icon/zap.svg" alt="Zap icon" /> Similar
          </button>
        )}
        <button
          onClick={() => {
            setViewMode("newest");
            setSearchTerm("");
          }}
          disabled={viewMode === "newest" ? true : false}
        >
          <img src="/img/icon/time.svg" alt="Clock icon" /> Newest
        </button>
        <button
          onClick={() => {
            setViewMode("shuffle");
            setSearchTerm("");
          }}
          disabled={viewMode === "shuffle" ? true : false}
        >
          <img src="/img/icon/shuffle.svg" alt="Shuffle icon" /> Shuffle
        </button>
      </div>

      <div className="cards-container">
        {similarCards.slice(begin, end).map((card, index) => (
          <div onClick={() => handleCardClick(card)} key={card.id}>
            <Card data={card} />
          </div>
        ))}
        {!similarCards.length && "No cards found."}
      </div>

      <div className="view-buttons">
        <button
          onClick={handleFirst}
          disabled={!similarCards.length || currentPage === 1 ? true : false}
        >
          <img src="/img/icon/chevrons-left.svg" alt="Back to page 1" />
        </button>

        <button
          onClick={handleBack}
          disabled={!similarCards.length || currentPage === 1 ? true : false}
        >
          <img src="/img/icon/chevron-left.svg" alt="Back 1 page" />
        </button>

        <button
          onClick={handleForward}
          disabled={
            !similarCards.length || currentPage === totalPages ? true : false
          }
        >
          <img src="/img/icon/chevron-right.svg" alt="Back 1 page" />
        </button>

        <button
          onClick={handleLast}
          disabled={
            !similarCards.length || currentPage === totalPages ? true : false
          }
        >
          <img src="/img/icon/chevrons-right.svg" alt="Last page" />
        </button>
      </div>
    </>
  );
}

export default Cards;
