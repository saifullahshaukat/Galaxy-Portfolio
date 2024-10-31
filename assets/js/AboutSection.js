export function renderAboutSection() {
  const scaleBox = document.querySelector(".about_grid");
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const aboutSecDiv = document.querySelector(".about_sec_div");
  const aboutSecDivElements = aboutSecDiv.querySelectorAll(
    "h2, p, .img-fluid, .wrapper"
  );
  const aboutFadeInClass = document.querySelector(".about-fade-in-class");
  const aboutFadeInClassElements = aboutFadeInClass.querySelectorAll("*"); // Select all elements inside aboutFadeInClass

  // Initially hide the aboutFadeInClass and its elements
  aboutFadeInClass.style.display = "none";
  aboutFadeInClassElements.forEach((element) => {
    element.style.display = "none";
    element.style.opacity = 0;
  });

  // Function to adjust the scale and opacity based on scroll position
  function adjustScaleOnScroll() {
    const scrollTop = window.scrollY;
    const startScroll = window.innerHeight * 1; // 200vh
    const endScroll = window.innerHeight * 2; // 300vh

    if (scrollTop >= startScroll && scrollTop <= endScroll) {
      // Calculate a scale factor based on how far the user has scrolled (between 1 and 1.6)
      const scaleFactor =
        1 + ((scrollTop - startScroll) / (endScroll - startScroll)) * 0.3; // Scales from 1 to 1.3
      // Apply the scale transformation
      scaleBox.style.transform = `scale(${scaleFactor})`;

      // Calculate opacity based on scale factor
      const opacity = 1 - (scaleFactor - 1) / 0.3;
      aboutSecDivElements.forEach((element) => {
        element.style.opacity = opacity;
        element.style.display = opacity === 0 ? "none" : "block";
      });

      // Hide the aboutFadeInClass elements
      aboutFadeInClassElements.forEach((element) => {
        element.style.opacity = 0;
        element.style.display = "none";
      });
    } else if (scrollTop < startScroll) {
      scaleBox.style.transform = "scale(1)";
      aboutSecDivElements.forEach((element) => {
        element.style.opacity = 1;
        element.style.display = "block";
      });

      // Hide the aboutFadeInClass elements
      aboutFadeInClass.style.display = "none";
      aboutFadeInClassElements.forEach((element) => {
        element.style.opacity = 0;
        element.style.display = "none";
      });
    } else if (scrollTop > endScroll) {
      scaleBox.style.transform = "scale(1.3)";
      scaleBox.style.width = `${scaleBox.offsetWidth}px`; // Fix width
      scaleBox.style.height = `${scaleBox.offsetHeight}px`; // Fix height
      aboutSecDivElements.forEach((element) => {
        element.style.opacity = 0;
        element.style.display = "none";
      });

      // Show the aboutFadeInClass elements with a fade-in effect based on scroll position
      aboutFadeInClass.style.display = "grid";
      const fadeInOpacity = Math.min(
        1,
        (scrollTop - endScroll) / window.innerHeight
      ); // Adjust fade-in speed
      aboutFadeInClassElements.forEach((element) => {
        element.style.display = "block";
        element.style.opacity = fadeInOpacity;
      });
    }
  }

  // Add the scroll event listener
  window.addEventListener("scroll", adjustScaleOnScroll);

  const aboutGrid = document.querySelector(".about_grid");
  const aboutSection = document.querySelector(".about.section");

  // Set the start and end points for sticking
  const startSticky = aboutSection.offsetTop; // The top position where sticky should begin
  const endSticky = startSticky + aboutSection.offsetHeight; // The end position

  // Scroll event listener to toggle stickiness
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    if (scrollTop >= startSticky && scrollTop <= endSticky) {
      // Apply sticky positioning within the specified scroll range
      aboutSection.style.position = "sticky";
      aboutGrid.style.top = "25vh"; // Adjust the 'top' value for where you want it to stick within the viewport
    }
  });
}
