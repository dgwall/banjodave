function scrollToElement(element) {
  const scrollElement = document.getElementById(element);
  if (scrollElement) {
    scrollElement.scrollIntoView({ behavior: "smooth" });
  }
}

export default scrollToElement;
