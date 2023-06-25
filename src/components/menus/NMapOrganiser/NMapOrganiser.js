import React, { useEffect } from "react";
import ExpandedMap from "../../items/ExpandedMap";
import MapListItem from "../../items/MapListItem";
import useProductData from "../../../hooks/useProductData";
import { useParams } from "react-router-dom";

const NMapOrganiser = ({ dataSource }) => {
  const {
    products,
    selectedProduct,
    setSelectedProduct,
    similarProducts,
    handleProductClick,
    handleTagClick,
    selectedTag,
  } = useProductData(dataSource);

  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [productId, products, setSelectedProduct]);

  return (
    <div id="product-list">
      {selectedProduct && (
        <ExpandedMap
          product={selectedProduct}
          handleTagClick={handleTagClick}
          selectedTag={selectedTag}
        />
      )}
      <div id="recommended" className="recommended">
        {similarProducts.map((product) => (
          <MapListItem
            key={product.id}
            product={product}
            onMapClick={handleProductClick}
            handleTagClick={handleTagClick}
            selectedTag={selectedTag}
          />
        ))}
      </div>
    </div>
  );
};

export default NMapOrganiser;
