import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Card from "../../components/items/Card";
import CardExpanded from "../../components/items/CardExpanded";
import "./Cards.css";
import { cardThemes } from "./cardThemes";
import { getButtonColor, darkenColor } from "../../components/utils/colorUtils";
import {
  fetchCards,
  sortCards,
  searchCards,
  getTopTags,
} from "../../components/menus/CardService";

const ITEMS_HOMEPAGE = 36;
const ITEMS_PER_PAGE = 8;
const ACCESS_LEVEL = 1;

const getTheme = (themeName) => {
  return cardThemes.find((theme) => theme.name === themeName) || {};
};

function Cards() {
  const [cards, setCards] = useState([]);
  const [isShowingRestrictedCards, setIsShowingRestrictedCards] =
    useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [similarCards, setSimilarCards] = useState([]);
  const [cardsInDeck, setCardsInDeck] = useState([]);
  const [viewMode, setViewMode] = useState("newest");
  const [groupMode, setGroupMode] = useState("card");
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [isSearchFocused, setSearchFocused] = useState(false);

  const searchInputRef = useRef(null);

  const topTags = getTopTags(cards);

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

  // get the current location
  const location = useLocation();

  // function for navigation
  const navigate = useNavigate();

  // fetch data and set state when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const { cards, totalPages } = await fetchCards(ACCESS_LEVEL);
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
    if (selectedCard && selectedCard.type === "Deck") {
      setCardsInDeck(
        cards
          .filter((c) => c.deck === selectedCard.deck && c.type !== "Deck")
          .sort((a, b) => a.id.localeCompare(b.id))
          .sort((a, b) => b.date.localeCompare(a.date))
      );
    }
  }, [selectedCard, cards, viewMode, searchTerm]);

  // handle changes in cardId
  useEffect(() => {
    if (cards.length && cardId) {
      const card = cards.find((card) => card.id.toString() === cardId);
      setSelectedCard(card);
      setViewMode("similar");

      if (card.type === "Deck") {
        setGroupMode("deck");
      } else {
        setGroupMode("card");
      }
    }
    // reset state when the location pathname becomes "/"
    else if (location.pathname === "/bwc") {
      setSelectedCard(null);
      setViewMode("newest");
      setGroupMode("card");
      setCurrentPage(1);
      setSearchTerm("");
    }
  }, [cards, cardId, location]);

  // handler for card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setViewMode("similar");
    setCurrentPage(1);
    setSearchTerm("");
    navigate(`/bwc/${card.id}`);
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

  // this will toggle the showing of restricted cards
  const removeRestrictedCards = () => {
    setIsShowingRestrictedCards((prevState) => !prevState);
  };

  const toggleGroupMode = () => {
    setGroupMode((prevState) => (prevState === "card" ? "deck" : "card"));
  };

  useEffect(() => {
    let accessFilteredCards = [...cards];
    if (!isShowingRestrictedCards) {
      accessFilteredCards = cards.filter(
        (card) => card.accessLevel <= ACCESS_LEVEL
      );
    }
    let displayedCards = accessFilteredCards;
    if (groupMode === "card") {
      displayedCards = accessFilteredCards.filter(
        (card) => card.type === "Card"
      );
    } else if (groupMode === "deck") {
      displayedCards = accessFilteredCards.filter(
        (card) => card.type === "Deck"
      );
    }
    setCurrentPage(1);
    // Sort cards based on viewMode after filtering
    const sortedCards = sortCards(
      displayedCards,
      viewMode,
      selectedCard,
      searchTerm
    );
    setSimilarCards(sortedCards);
  }, [
    cards,
    isShowingRestrictedCards,
    viewMode,
    selectedCard,
    searchTerm,
    groupMode,
  ]);

  return (
    <>
      {selectedCard ? (
        <section
          className="card-selected"
          style={{
            "--bg-color": selectedTheme?.bg,
            "--fg-color": selectedTheme?.fg,
            "--hl-color": selectedTheme?.hl,
            "--bt-color": buttonTextColor,
            "--hl-a-color": hlAColor,
            "--hl-b-color": hlBColor,
          }}
          tabIndex="0"
          aria-label="Selected Card View"
          role="contentinfo"
        >
          <CardExpanded
            data={selectedCard}
            access={ACCESS_LEVEL}
            deck={cardsInDeck}
          />
        </section>
      ) : (
        <>
          <header role="banner">
            <h1>(Under Construction)</h1>
            <h1>Banjeetz × BWC Preview</h1>
            <h2>Digital Content Holo-Cards</h2>
          </header>
          <main role="main">
            <div>
              <s>0 patrons</s>
            </div>
            <div>{cards.length} cards</div>
            <div>0 crypto</div>
            <div
              style={{
                fontSize: "small",
                textAlign: "center",
                width: "50%",
                marginTop: "1rem",
              }}
            >
              Top tags:{" "}
              {topTags.map(
                (tag, index) =>
                  `${tag.name}${index === topTags.length - 1 ? "..." : ", "}`
              )}
            </div>
          </main>
        </>
      )}

      <nav className="view-buttons">
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
          aria-label="Search"
        />
      </nav>

      <div className="view-buttons">
        <button onClick={toggleGroupMode}>
          {groupMode === "card" ? (
            <>
              <img src="/img/icon/contract.svg" alt="Shrink" /> Deck View
            </>
          ) : (
            <>
              <img src="/img/icon/expand.svg" alt="Expand" /> Card View
            </>
          )}
        </button>
        <button
          onClick={removeRestrictedCards}
          disabled={ACCESS_LEVEL === 3 ? true : false}
        >
          {isShowingRestrictedCards ? (
            <>
              <img
                src="/img/icon/bwc-inverted.webp"
                alt="BWC icon"
                style={{ filter: "invert(100%)" }}
              />{" "}
              Hide Locked
            </>
          ) : (
            <>
              <img
                src="/img/icon/bwc.webp"
                alt="BWC icon"
                style={{ filter: "invert(100%)" }}
              />{" "}
              Show Locked
            </>
          )}
        </button>
      </div>

      <div className="view-buttons sort-buttons">
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

      <div className="cards-container" role="grid">
        {similarCards.slice(begin, end).map((card, index) => (
          <button
            onClick={() => handleCardClick(card)}
            key={card.id}
            tabIndex={0}
            role="gridcell"
          >
            <Card data={card} access={ACCESS_LEVEL} />
          </button>
        ))}
        {!similarCards.length && "No cards found."}
      </div>

      {!selectedCard && (
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
      )}
    </>
  );
}

export default Cards;
