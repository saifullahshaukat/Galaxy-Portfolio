export function renderSearchButton() {
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      var searchForm = document.getElementById("searchForm");
      if (searchForm.style.display === "none") {
        searchForm.style.display = "inline";
        this.style.display = "none";
      }
    });

  document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var query = this.querySelector(
        'input[type="search"]'
      ).value.toLowerCase();
      var sections = document.querySelectorAll("section");
      sections.forEach(function (section) {
        if (section.textContent.toLowerCase().includes(query)) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
      document.getElementById("searchForm").style.display = "none";
      var searchButton = document.getElementById("searchButton");
      searchButton.style.display = "inline";
    });
}
