((document) => {
  class ThemeToggle {
    constructor(toggleElement, themes) {
      this.toggleElement = toggleElement;
      this.themes = themes;
      this.storageRef = "theme";
      this.init();
    }

    init() {
      if (Array.isArray(this.themes) && this.toggleElement && this.toggleElement.type === "range") {
        this._setTheme();
        this._attachUpdateThemeEventHandler();
      }
    }

    _setTheme() {
      const themeName = localStorage.getItem(this.storageRef) || this.themes[0];
      this.toggleElement.setAttribute("max", this.themes.length - 1);
      this._updateTheme(themeName);
    }

    _updateTheme(themeName) {
      const themeIndex = this.themes.indexOf(themeName);
      localStorage.setItem(this.storageRef, themeName);
      document.body.setAttribute("data-theme", themeName);
      this.toggleElement.setAttribute("value", themeIndex);
    }

    _attachUpdateThemeEventHandler() {
      this.toggleElement.addEventListener("change", (event) => {
        this._updateTheme(this.themes[event.target.value]);
      });
    }
  }

  new ThemeToggle(document.getElementById("theme"), ["default", "light", "funky"]);
})(document);
