const filterSimilarProducts = (products, selectedProduct) => {
  const selectedProductTagsSet = new Set(selectedProduct.tags);

  const similarItems = products.reduce((acc, product) => {
    if (product.id !== selectedProduct.id) {
      const commonTagsLength = product.tags.reduce(
        (count, tag) => count + (selectedProductTagsSet.has(tag) ? 1 : 0),
        0
      );
      acc.push({ ...product, commonTagsLength });
    }
    return acc;
  }, []);

  similarItems.sort((a, b) => b.commonTagsLength - a.commonTagsLength);

  return similarItems;
};

export default filterSimilarProducts;
