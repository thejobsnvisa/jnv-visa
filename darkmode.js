// Dark mode functionality
class DarkModeToggle {
  constructor() {
    this.toggle = document.getElementById("themeToggle");
    this.prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    this.init();
  }

  init() {
    // Set initial theme
    this.setInitialTheme();

    // Add event listeners
    this.toggle.addEventListener("click", () => this.toggleTheme());
    this.prefersDark.addEventListener("change", (e) =>
      this.handleSystemThemeChange(e)
    );

    // Update toggle icon
    this.updateToggleIcon();

    // Add smooth transition class after initial load
    setTimeout(() => {
      document.body.classList.add("theme-transition");
    }, 100);
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = this.prefersDark.matches;

    if (savedTheme) {
      this.applyTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.applyTheme("dark");
    } else {
      this.applyTheme("light");
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    this.applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Add toggle animation
    this.animateToggle();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.updateToggleIcon();

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);

    // Dispatch custom event for other components
    window.dispatchEvent(
      new CustomEvent("themeChanged", {
        detail: { theme },
      })
    );
  }

  updateToggleIcon() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const icon = this.toggle.querySelector("i");

    if (currentTheme === "dark") {
      icon.className = "fas fa-sun";
      this.toggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      icon.className = "fas fa-moon";
      this.toggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    const color = theme === "dark" ? "#0F172A" : "#FFFFFF";
    metaThemeColor.setAttribute("content", color);
  }

  animateToggle() {
    this.toggle.style.transform = "scale(0.8) rotate(180deg)";

    setTimeout(() => {
      this.toggle.style.transform = "scale(1) rotate(0deg)";
    }, 150);
  }

  handleSystemThemeChange(e) {
    // Only apply system theme if user hasn't manually set a preference
    if (!localStorage.getItem("theme")) {
      this.applyTheme(e.matches ? "dark" : "light");
    }
  }
}

// Theme-specific animations and effects
class ThemeEffects {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("themeChanged", (e) => {
      this.handleThemeChange(e.detail.theme);
    });
  }

  handleThemeChange(theme) {
    // Add special effects when switching themes
    this.createThemeTransition(theme);

    // Update any theme-specific animations
    this.updateAnimations(theme);
  }

  createThemeTransition(theme) {
    const overlay = document.createElement("div");
    overlay.className = "theme-transition-overlay";
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme === "dark" ? "#0F172A" : "#FFFFFF"};
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;

    document.body.appendChild(overlay);

    // Animate overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = "0.8";

      setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 300);
      }, 100);
    });
  }

  updateAnimations(theme) {
    // Update any theme-specific animation properties
    const heroShape = document.querySelector(".hero-shape");
    if (heroShape) {
      if (theme === "dark") {
        heroShape.style.background =
          "linear-gradient(135deg, #1E3A8A, #3B82F6)";
      } else {
        heroShape.style.background =
          "linear-gradient(135deg, #86EFAC, #22C55E)";
      }
    }
  }
}

// Enhanced theme utilities
class ThemeUtils {
  static getTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  static isDark() {
    return this.getTheme() === "dark";
  }

  static isLight() {
    return this.getTheme() === "light";
  }

  static onThemeChange(callback) {
    window.addEventListener("themeChanged", (e) => {
      callback(e.detail.theme);
    });
  }
}

// Add CSS for smooth theme transitions
const themeCSS = document.createElement("style");
themeCSS.textContent = `
    .theme-transition * {
        transition: background-color 0.3s ease, 
                    color 0.3s ease, 
                    border-color 0.3s ease,
                    box-shadow 0.3s ease !important;
    }
    
    .theme-toggle {
        transition: all 0.3s ease;
    }
    
    .theme-toggle:active {
        transform: scale(0.9);
    }
    
    /* Dark mode specific adjustments */
    [data-theme="dark"] .hero-shape {
        background: linear-gradient(135deg, #1E3A8A, #3B82F6) !important;
    }
    
    [data-theme="dark"] .navbar {
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        background-color: rgba(15, 23, 42, 0.95);
    }
    
    /* Smooth transitions for all theme-aware elements */
    :root {
        transition: --bg-primary 0.3s ease, 
                    --bg-secondary 0.3s ease,
                    --text-primary 0.3s ease,
                    --text-secondary 0.3s ease,
                    --border-color 0.3s ease;
    }
`;
document.head.appendChild(themeCSS);

// Logo switching function
function updateLogo(theme) {
  const logoImg = document.querySelector(".logo-image");
  if (!logoImg) return;
  logoImg.src = theme === "dark" ? "dark.svg" : "light.svg";
}

// Initialize dark mode when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new DarkModeToggle();
  new ThemeEffects();
  // Initialize theme-aware components
  initThemeAwareComponents();
  // Set logo on initial load
  updateLogo(ThemeUtils.getTheme());
});

function initThemeAwareComponents() {
  // Update any components that need theme-specific behavior
  const cards = document.querySelectorAll(
    ".industry-card, .service-card, .reason-card"
  );
  ThemeUtils.onThemeChange((theme) => {
    cards.forEach((card) => {
      // Add subtle theme-specific hover effects
      if (theme === "dark") {
        card.style.setProperty(
          "--hover-glow",
          "0 0 20px rgba(34, 197, 94, 0.2)"
        );
      } else {
        card.style.setProperty("--hover-glow", "0 8px 25px rgba(0, 0, 0, 0.1)");
      }
    });
    // Update logo when theme changes
    updateLogo(theme);
  });
}

// Keyboard shortcuts for theme toggle
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + Shift + T to toggle theme
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "T") {
    e.preventDefault();
    document.getElementById("themeToggle").click();
  }
});

// Export for use in other scripts
window.ThemeUtils = ThemeUtils;
