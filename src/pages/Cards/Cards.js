import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import filterSimilarProducts from "../../components/menus/filterSimilarProducts";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "../../components/items/Card";
import "./Cards.css";

const ITEMS_PER_PAGE = 6;

function Cards() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [similarCards, setSimilarCards] = useState([]);
  const { cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/PSYCHOGORILLA.json");
      const sortedData = response.data.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setCards(sortedData);
      setSimilarCards(sortedData);
      setTotalPages(Math.ceil(sortedData.length / ITEMS_PER_PAGE));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCard) {
      const similarItems = filterSimilarProducts(cards, selectedCard);
      setSimilarCards(similarItems);
    }
  }, [selectedCard, cards]);

  useEffect(() => {
    if (cardId) {
      const card = cards.find((card) => card.id.toString() === cardId);
      setSelectedCard(card);
    }
  }, [cardId, cards]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setCurrentPage(1);
    navigate(`/cards/${card.id}`);
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleForward = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const begin = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = begin + ITEMS_PER_PAGE;

  return (
    <div>
      {selectedCard && (
        <div>
          <h1>Selected Card:</h1>
          <Card data={selectedCard} />
        </div>
      )}
      <TransitionGroup>
        <div className="cards-container">
          {similarCards.slice(begin, end).map((card) => (
            <CSSTransition key={card.id} timeout={500} classNames="fade">
              <div
                onClick={() => handleCardClick(card)}
                style={{ display: "inline-block" }}
              >
                <Card data={card} />
              </div>
            </CSSTransition>
          ))}
        </div>
      </TransitionGroup>

      <div className="buttons">
        {currentPage !== 1 && <button onClick={handleBack}>Back</button>}
        {currentPage !== totalPages - 1 && (
          <button onClick={handleForward}>More</button>
        )}
      </div>
    </div>
  );
}

export default Cards;
