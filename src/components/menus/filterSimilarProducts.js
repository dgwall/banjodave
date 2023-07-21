const filterSimilarProducts = (products, selectedProduct) => {
  if (!selectedProduct.tags) return products;

  const tagsLen = selectedProduct.tags.length;
  const selectedProductTagsMap = new Map(
    selectedProduct.tags.map((tag, index) => [
      tag.toLowerCase(),
      (tagsLen + 1 - index) / tagsLen,
    ])
  );

  const similarItems = products.map((product) => {
    if (product.id === selectedProduct.id || !product.tags) {
      return { ...product, sharedTagsWeightedSum: 0 };
    }

    let sharedTagsWeightedSum = 0;
    product.tags.forEach((tag) => {
      const lowerCaseTag = tag.toLowerCase();
      if (selectedProductTagsMap.has(lowerCaseTag)) {
        sharedTagsWeightedSum += selectedProductTagsMap.get(lowerCaseTag);
      }
    });

    return { ...product, sharedTagsWeightedSum };
  });

  similarItems.sort(
    (a, b) => b.sharedTagsWeightedSum - a.sharedTagsWeightedSum
  );

  return similarItems;
};

export default filterSimilarProducts;
