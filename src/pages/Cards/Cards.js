import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cards.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "../../components/items/Card";

const ITEMS_PER_PAGE = 5;

function Cards() {
  const [products, setProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/PSYCHOGORILLA.json");
      setProducts(response.data);
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <TransitionGroup>
        <div className="cards-container">
          {products.slice(0, itemsToShow).map((product) => (
            <CSSTransition key={product.id} timeout={500} classNames="fade">
              <Card data={product} />
            </CSSTransition>
          ))}
        </div>
      </TransitionGroup>

      {itemsToShow < products.length && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
}

export default Cards;
