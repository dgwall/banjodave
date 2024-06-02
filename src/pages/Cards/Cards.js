import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Card from "../../components/items/Card";
import CardExpanded from "../../components/items/CardExpanded";
import "./Cards.css";
import { cardThemes } from "./cardThemes";
import { getButtonColor, darkenColor } from "../../components/utils/colorUtils";
import {
  fetchCards,
  sortCards,
  searchCards,
  getDeckId,
  getRandomTags,
} from "../../components/menus/CardService";

const ITEMS_HOMEPAGE = 18;
const ITEMS_PER_PAGE = 9;
const ACCESS_LEVEL = 3;

const getTheme = (themeName) => {
  return cardThemes.find((theme) => theme.name === themeName) || {};
};

function PaginationButtons({
  currentPage,
  totalPages,
  similarCards,
  handleFirst,
  handleBack,
  handleForward,
  handleLast,
  error,
}) {
  return (
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

      <div className="page-number" style={{ color: !totalPages && "#be6868" }}>
        {totalPages
          ? `Page ${currentPage} / ${totalPages}`
          : error
          ? error
          : "No cards found"}
      </div>

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
  );
}

function Cards() {
  const [cards, setCards] = useState([]);
  const [isShowingRestrictedCards, setIsShowingRestrictedCards] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [similarCards, setSimilarCards] = useState([]);
  const [cardsInDeck, setCardsInDeck] = useState([]);
  const [deckId, setDeckId] = useState("");
  const [viewMode, setViewMode] = useState("newest");
  const [groupMode, setGroupMode] = useState("both");
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1280);
  const [searchSuggestions, setSearchSuggestions] = useState("");

  const searchInputRef = useRef(null);

  useEffect(() => {
    let searchInterval;
    if (searchTerm !== lastSearch) {
      if (!searchTerm) {
        setViewMode("newest");
        return;
      }
      searchInterval = setTimeout(() => {
        const searchedCards = searchCards(cards, searchTerm);
        setSimilarCards(searchedCards);
        setViewMode("search");
        setLastSearch(searchTerm);
      }, 500);
    }
    return () => clearTimeout(searchInterval); // always clear timeout
  }, [searchTerm, lastSearch, isSearchFocused, cards]);

  // This function checks if the focus was outside of the dropdown
  const handleFocusOutside = (event) => {
    const dropdownElement = document.querySelector(".view-tools-dropdown");
    const sortFilterButton = document.querySelector(".sort-filter");

    if (
      dropdownElement &&
      !dropdownElement.contains(event.target) &&
      event.target !== sortFilterButton
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Skip keyboard navigation if dropdown hidden
    const dropdownElement = document.querySelector(".view-tools-dropdown");
    const focusableElements = dropdownElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.forEach((element) => {
      element.tabIndex = dropdownVisible ? 0 : -1;
    });

    // Closing dropdown if we click outside or focus outside
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleFocusOutside);
      document.addEventListener("focusin", handleFocusOutside);
    } else {
      document.removeEventListener("mousedown", handleFocusOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleFocusOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [dropdownVisible]);

  // get card id from the url
  const { cardId } = useParams();

  // get the current location
  const location = useLocation();

  // function for navigation
  const navigate = useNavigate();

  // fetch data and set state when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { cards, totalPages } = await fetchCards(ACCESS_LEVEL);
        setCards(cards);
        setSimilarCards(cards);
        setTotalPages(totalPages);
      } catch (error) {
        setErrorMessage(
          "Failed to fetch cards. Please refresh the page or try again later."
        );
      }
    };

    fetchData();
  }, []);

  // determine window size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // sort the cards when viewMode changes
  useEffect(() => {
    const sortedCards = sortCards(cards, viewMode, selectedCard, searchTerm);
    setSearchSuggestions(getRandomTags(cards, ACCESS_LEVEL));
    setSimilarCards(sortedCards);
    setCurrentPage(1);
    if (selectedCard) {
      if (selectedCard.type === "Deck") {
        setCardsInDeck(
          cards
            .filter((c) => c.deck === selectedCard.deck && c.type !== "Deck")
            .sort((a, b) => a.id.localeCompare(b.id))
            .sort((a, b) => b.date.localeCompare(a.date))
        );
      }
      if (selectedCard.type === "Card") {
        setDeckId(getDeckId(cards, selectedCard?.deck));
      }
    }
  }, [selectedCard, cards, viewMode, searchTerm]);

  // handle changes in cardId
  useEffect(() => {
    if (cards.length && cardId) {
      const card = cards.find((card) => card.id.toString() === cardId);
      if (card) {
        setSelectedCard(card);
        setViewMode("similar");
      } else {
        // Handle the case where the card does not exist
        navigate("/bfd"); // Redirect to the main page
      }
    }
    // reset state when the location pathname becomes "/"
    else if (location.pathname === "/bfd") {
      setSelectedCard(null);
      setViewMode("newest");
      setCurrentPage(1);
      setSearchTerm("");
    }
  }, [cards, cardId, location, navigate]);

  // handler for card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setViewMode("similar");
    setCurrentPage(1);
    setSearchTerm("");
    navigate(`/bfd/${card.id}`);
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

  const handleSortChange = (event) => {
    setSearchTerm("");
    setDropdownVisible(false);
    setViewMode(event.target.value);
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
      <Helmet>
        {selectedCard ? (
          <>
            <title>{`BFD ${selectedCard?.title}`}</title>
            <meta content="BanjoDave.com" property="og:site_name" />
            <meta
              name="description"
              content={`BFD ${selectedCard?.title} on BanjoDave.com. ${selectedCard?.tagline}.`}
            />
            <meta
              property="og:title"
              content={`${selectedCard?.title} on BanjoDave.com`}
            />
            <meta
              property="og:image"
              content={`/img/thumbnails/${selectedCard.id}.webp`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:description" content={selectedCard?.tagline} />
            <meta name="theme-color" content={selectedTheme?.hl} />
          </>
        ) : (
          <title>Banjeetz x BFD Holo-Cards</title>
        )}
      </Helmet>

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
            parentDeck={deckId}
          />
        </section>
      ) : (
        <>
          <header role="banner">
            <h1>Banjeetz × 𝕭𝕱𝕯 Preview</h1>
            <h2>Digital Content Holo-Card Archive</h2>
          </header>
          <p>_,.-⚚-.,_</p>
        </>
      )}

      <nav className="view-buttons view-tools">
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyPress}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          placeholder={`🔎 Search (e.g. ${searchSuggestions})`}
          ref={searchInputRef}
          aria-label="Search"
        />
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className={`sort-filter ${dropdownVisible && "disabled"}`}
        >
          <div>
            {viewMode === "search" && "Searching"}
            {viewMode === "similar" && "Similar"}
            {viewMode === "newest" && "Newest"}
            {viewMode === "alphabetical" && "A-Z"}
            {viewMode === "shuffle" || viewMode === "reshuffle"
              ? "Shuffled"
              : ""}
            {groupMode === "card" && " cards"}
            {groupMode === "deck"
              ? " decks"
              : !isShowingRestrictedCards
              ? " 🙈"
              : ""}
          </div>
          <img src="/img/icon/sort.webp" alt="Sort icon" />
        </button>
      </nav>

      <div className="view-tools-dropdown-container">
        <div
          className={`view-tools-dropdown ${dropdownVisible ? "show" : "hide"}`}
        >
          {selectedCard && (
            <button
              value="similar"
              onClick={handleSortChange}
              disabled={viewMode === "similar" ? true : false}
            >
              Similar ✨
            </button>
          )}
          <button
            value="newest"
            onClick={handleSortChange}
            disabled={viewMode === "newest" ? true : false}
          >
            Newest 🕒
          </button>
          <button
            value="alphabetical"
            onClick={handleSortChange}
            disabled={viewMode === "alphabetical" ? true : false}
          >
            Alphabetical 🔠
          </button>
          <button
            value={viewMode === "reshuffle" ? "shuffle" : "reshuffle"}
            onClick={handleSortChange}
          >
            Shuffle! 🎲
          </button>
          <hr />
          <button
            value="similar"
            onClick={() => {
              setGroupMode("card");
              setDropdownVisible(false);
            }}
            disabled={groupMode === "card" ? true : false}
          >
            Cards Only 🎴
          </button>
          <button
            value="newest"
            onClick={() => {
              setGroupMode("deck");
              setDropdownVisible(false);
            }}
            disabled={groupMode === "deck" ? true : false}
          >
            Decks Only 📁
          </button>
          <button
            value="alphabetical"
            onClick={() => {
              setGroupMode("both");
              setDropdownVisible(false);
            }}
            disabled={groupMode === "both" ? true : false}
          >
            Show Both 🗃️
          </button>
          {groupMode !== "deck" && (
            <>
              <hr />
              <button
                onClick={(e) => {
                  removeRestrictedCards(e);
                  setDropdownVisible(false);
                }}
              >
                {isShowingRestrictedCards
                  ? "Hide Locked Cards 🙈"
                  : "Show Locked Cards 👀"}
              </button>
            </>
          )}
        </div>
      </div>

      {!selectedCard && (
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          similarCards={similarCards}
          handleFirst={handleFirst}
          handleBack={handleBack}
          handleForward={handleForward}
          handleLast={handleLast}
          error={errorMessage}
        />
      )}

      <div className="cards-container cards-container-large" role="grid">
        {similarCards.slice(begin, end).map((card, index) => (
          <button
            onClick={() => handleCardClick(card)}
            key={card.id}
            tabIndex={0}
            role="gridcell"
          >
            {isSmallScreen ? (
              <Card data={card} access={ACCESS_LEVEL} />
            ) : (
              <Card data={card} access={ACCESS_LEVEL} />
            )}
          </button>
        ))}
      </div>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        similarCards={similarCards}
        handleFirst={handleFirst}
        handleBack={handleBack}
        handleForward={handleForward}
        handleLast={handleLast}
        error={errorMessage}
      />

      <nav className="view-buttons quick-links">
        {!selectedCard && (
          <div className="page-number">
            <img
              src="/img/icon/zap.svg"
              alt="icons"
              style={{ filter: "invert(100%)", paddingRight: "0.5rem" }}
            />
            Quick Links:
          </div>
        )}
        {selectedCard && (
          <button
            onClick={() => {
              setSearchTerm("");
              setViewMode("similar");
              setGroupMode("both");
              setIsShowingRestrictedCards(true);
              setCurrentPage(1);
            }}
            title="Recommended"
          >
            <img src="/img/icon/star.svg" alt="Star" />
            {!isSmallScreen && <div>Recommended</div>}
          </button>
        )}
        <button
          onClick={() => {
            setCurrentPage(1);
            setIsShowingRestrictedCards(true);
            setViewMode("alphabetical");
            setGroupMode("deck");
          }}
          title="A-Z categories"
        >
          <img src="/img/icon/archive.svg" alt="icons" />
          {!isSmallScreen && <div>A-Z categories</div>}
        </button>
        {selectedCard && (
          <div className="page-number">
            <img
              src="/img/icon/zap.svg"
              alt="icons"
              style={{ filter: "invert(100%)", paddingLeft: "0.5rem" }}
            />
          </div>
        )}
        <button
          onClick={() => {
            setSearchTerm("");
            setViewMode("newest");
            setGroupMode("card");
            setIsShowingRestrictedCards(false);
            setCurrentPage(1);
          }}
          title="Most recent unlocked cards"
        >
          <img src="/img/icon/time.svg" alt="Clock" />
          {!isSmallScreen && <div>Recently available</div>}
        </button>
        <button
          onClick={() => {
            setSearchTerm("");
            setViewMode(`${viewMode === "shuffle" ? "reshuffle" : "shuffle"}`);
            setGroupMode("both");
            setIsShowingRestrictedCards(true);
            setCurrentPage(1);
          }}
          title="Shuffle all"
        >
          <img src="/img/icon/shuffle.svg" alt="Shuffle" />
          {!isSmallScreen && <div>Shuffle all</div>}
        </button>
      </nav>

      <main>
        <div
          style={{
            textAlign: "center",
            width: "50%",
            marginTop: "1rem",
            fontSize: "large",
          }}
          className="overview"
        >
          <p>✦✧✶✧✦</p>
          <p>
            🀄 𝕰𝖝𝖕𝖑𝖔𝖗𝖊 Ψ 𝕭𝕱𝕯 𝕮𝖆𝖗𝖉𝖘 ⊕{" "}
            <span
              style={{
                fontFamily: "monospace",
                background: "#000",
                color: "#00FFC0",
              }}
            >
              {cards.filter((card) => card.type === "Card").length}
            </span>{" "}
            decidedly <span>𝖓𝖔𝖓-NFT</span> 🃏 interactive cards offering{" "}
            <span>games🎮</span>, <span>videos🎥</span>, <span>music🎧</span>,{" "}
            <span>art🎨</span>, <span>blogs✍️</span>, and <span>more🔮</span>,
            to <span>ΣxPlOrE aNd ShArΣ</span>
          </p>
          {/*<p>
            As a{" "}
            <span>
              ☽<s>𝝦atreon member</s>☾
            </span>{" "}
            <span style={{ fontSize: "x-small" }}>(coming soon™)</span>, not
            only do you <span>unl🔓ck</span> more{" "}
            <img src="/img/sig-small.webp" alt="Banjo" title="Banjo" /> content,
            you also get the chance to <span>𝓒𝓡𝓐𝓕𝓣 🛠️</span> your own cards for
            the
            <span style={{ fontVariant: "small-caps" }}>
              「〒 Community Deck」
            </span>
            or, if you're a{" "}
            <span style={{ fontVariant: "small-caps" }}>
              <span style={{ color: "#FF0000" }}>l</span>
              <span style={{ color: "#FF6600" }}>v</span>
              <span style={{ color: "#FFCC00" }}>l</span>
              <span style={{ color: "#99CC00" }}>3</span>
              <span style={{ color: "#33CC00" }}>t</span>
              <span style={{ color: "#00CCCC" }}>h</span>
              <span style={{ color: "#0066CC" }}>r</span>
              <span style={{ color: "#3333CC" }}>e</span>
              <span style={{ color: "#9900CC" }}>e</span>{" "}
              <span style={{ color: "#666666" }}>member</span>
            </span>
            , create your own
            <span style={{ fontVariant: "small-caps" }}>
              「🏯 Custom Deck」
            </span>
            </p>*/}
          <p>⌬</p>
          <p>
            <span>꧁(✿◠‿◠</span>(◕‿◕)<span>♥‿♥｡)꧂</span>
          </p>
          <p
            style={{
              background: "linear-gradient(to left, #DDDDDD, #FFFFFF)",
              WebkitBackgroundClip: "text",
              MozBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontVariant: "small-caps",
            }}
          >
            &gt; lvl2one preview access granted
          </p>
          <p style={{ color: "yellow" }}>
            This was mostly a programming exercise and I dont keep this updated
            anymore.
          </p>
          <p style={{ fontSize: "x-large" }}>྾ banjo</p>
        </div>
      </main>
    </>
  );
}

export default Cards;
