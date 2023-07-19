const filterSimilarProducts = (products, selectedProduct) => {
  if (!selectedProduct.tags) return products;

  const selectedProductTagsSet = selectedProduct
    ? new Set(selectedProduct.tags.map((tag) => tag.toLowerCase()))
    : [];

  const similarItems = products.reduce((acc, product) => {
    if (product.id !== selectedProduct.id) {
      let sharedTagsWeightedSum = 0;
      product.tags &&
        product.tags.forEach((tag, index) => {
          const lowerCaseTag = tag.toLowerCase();
          if (selectedProductTagsSet.has(lowerCaseTag)) {
            // Compute a weight based on the position of the tag
            const weight =
              (product.tags.length + 1 - index) / product.tags.length;
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
