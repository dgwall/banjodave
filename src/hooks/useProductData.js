import { useState, useEffect } from "react";
import filterSimilarProducts from "../components/menus/filterSimilarProducts";

const useProductData = (dataSource) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

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
        setSelectedProduct(data[0]);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [dataSource]);

  useEffect(() => {
    if (selectedProduct) {
      const similarItems = filterSimilarProducts(products, selectedProduct);
      setSimilarProducts(similarItems);
    }
  }, [selectedProduct, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);

    const productListElement = document.getElementById("product-list");
    if (productListElement) {
      productListElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { selectedProduct, similarProducts, handleProductClick };
};

export default useProductData;
