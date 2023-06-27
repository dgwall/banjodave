import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import filterSimilarProducts from "../components/menus/filterSimilarProducts";
import scrollToElement from "../components/utils/scrollToElement";

const useProductData = (dataSource, type) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const navigate = useNavigate();
  const dataCategory = type;

  useEffect(() => {
    fetch(dataSource)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setSimilarProducts(data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [dataSource]);

  useEffect(() => {
    if (selectedProduct) {
      const similarItems = filterSimilarProducts(products, selectedProduct);
      setSimilarProducts(similarItems);
    }
  }, [selectedProduct, products]);

  useEffect(() => {
    if (selectedTag) {
      setSimilarProducts((prevSimilarProducts) => {
        return [...prevSimilarProducts].sort((a, b) => {
          return b.tags.includes(selectedTag) - a.tags.includes(selectedTag);
        });
      });
    }
  }, [selectedTag]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate(`/${dataCategory}/${product.id}`);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    scrollToElement("recommended");
  };

  return {
    products,
    setSelectedProduct,
    selectedProduct,
    similarProducts,
    handleProductClick,
    handleTagClick,
    selectedTag,
  };
};

export default useProductData;
