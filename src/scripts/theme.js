((document) => {
  const themeToggle = document.getElementById("theme-toggle");

  setTheme();

  themeToggle.addEventListener("change", (event) => {
    const themeName = event.target.dataset.theme;
    if (themeName) {
      updateTheme(themeName);
    }
  });

  function setTheme() {
    const savedTheme = localStorage.getItem("theme") || "default";
    document.body.setAttribute("data-theme", savedTheme);
    document.getElementById(`theme-${savedTheme}`).setAttribute("checked", true);
  }

  function updateTheme(themeName) {
    if (themeName == null) return;
    document.body.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  }
})(document);
