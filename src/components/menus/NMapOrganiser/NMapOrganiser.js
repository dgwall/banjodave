import React from "react";
import ExpandedMap from "../../items/ExpandedMap";
import MapListItem from "../../items/MapListItem";
import useProductData from "../../../hooks/useProductData";

const NMapOrganiser = ({ dataSource }) => {
  const { selectedProduct, similarProducts, handleProductClick } =
    useProductData(dataSource);

  return (
    <div id="product-list">
      {selectedProduct && <ExpandedMap product={selectedProduct} />}
      <div>
        {similarProducts.slice(0, 50).map((product) => (
          <MapListItem
            key={product.id}
            product={product}
            onMapClick={handleProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default NMapOrganiser;
