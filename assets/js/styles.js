// styles.js

export function RenderStyles() {
  const cards = document.querySelectorAll('.card-ser');
  const container = document.querySelector('.card-container-ser');

  // Calculate the total scrollable height based on the number of cards
  const totalScrollHeight = window.innerHeight * (cards.length / 5); // 5 cards per viewport

  // Set the initial position of the cards to be off-screen to the right and hidden
  cards.forEach((card) => {
    card.style.transform = `translateX(${window.innerWidth * 2.84}px)`; // Move them more to the right
    card.style.opacity = 0; // Initially hide the cards
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate the offset for card animation based on scroll position
    const offset = (scrollTop / totalScrollHeight) * viewportHeight * (cards.length / 5);

    cards.forEach((card) => {
      // Move each card leftwards as the user scrolls down
      card.style.transform = `translateX(${window.innerWidth * 2.84 - offset}px)`; // Adjust the offset accordingly
      
      // Calculate the opacity based on scroll position
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < viewportHeight) {
        card.style.opacity = Math.min(1, (viewportHeight - cardTop) / viewportHeight);
      } else {
        card.style.opacity = 0;
      }
    });
  });
}
