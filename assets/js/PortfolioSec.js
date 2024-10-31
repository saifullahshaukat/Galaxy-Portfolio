// PORTFOLIO
export function renderPortfolioSection() {
  document.addEventListener("scroll", function () {
    const portfolioSection = document.querySelector("#portfolio");
    const sectionTop = portfolioSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Check if the section is within the viewport range to start fading in
    if (sectionTop < windowHeight && sectionTop > 0) {
      // Calculate opacity based on the scroll position, making it increase as it enters view
      const opacity = 1 - sectionTop / windowHeight;
      portfolioSection.style.opacity = opacity;
    } else if (sectionTop <= 0) {
      // Once fully scrolled into view, keep it fully visible
      portfolioSection.style.opacity = 1;
    }
  });
}
