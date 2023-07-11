const filterSimilarProducts = (products, selectedProduct) => {
  const selectedProductTagsSet = new Set(selectedProduct.tags);

  const similarItems = products.reduce((acc, product) => {
    if (product.id !== selectedProduct.id) {
      let sharedTagsWeightedSum = 0;
      product.tags.forEach((tag, index) => {
        if (selectedProductTagsSet.has(tag)) {
          // Compute a weight based on the position of the tag
          const weight = (product.tags.length - index) / product.tags.length;
          sharedTagsWeightedSum += weight;
        }
      });
      acc.push({ ...product, sharedTagsWeightedSum });
    }
    return acc;
  }, []);

  similarItems.sort(
    (a, b) => b.sharedTagsWeightedSum - a.sharedTagsWeightedSum
  );

  return similarItems;
};

export default filterSimilarProducts;
