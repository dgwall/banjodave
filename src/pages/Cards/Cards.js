import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cards.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "../../components/items/Card";

const ITEMS_PER_PAGE = 10;

function Cards() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Change this URL to where your JSON is located
    const fetchData = async () => {
      const response = await axios.get("/PSYCHOGORILLA.json");
      setProducts(response.data);
      setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const begin = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = begin + ITEMS_PER_PAGE;

  return (
    <div>
      <TransitionGroup>
        <div className="cards-container">
          {products.slice(begin, end).map((product) => (
            <CSSTransition key={product.id} timeout={500} classNames="fade">
              <Card data={product} />
            </CSSTransition>
          ))}
        </div>
      </TransitionGroup>

      {[...Array(totalPages)].map((e, i) => (
        <button key={i} onClick={() => handlePageChange(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Cards;
