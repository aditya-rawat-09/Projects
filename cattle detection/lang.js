// Get saved language from localStorage or default to "en"
let currentLang = localStorage.getItem("lang") || "en";

// Update page text from data-en / data-hi
function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang); // save selection

  document.querySelectorAll("[data-en]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.textContent = text;
    }
  });

  // Update button text
  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.textContent = lang === "en" ? "🌐 हिंदी" : "🌐 English";
  }

  // Update placeholder text
  const feedbackText = document.getElementById("feedbackText");
  if (feedbackText) {
    feedbackText.placeholder = lang === "en" ? "Optional feedback..." : "वैकल्पिक प्रतिक्रिया...";
  }
}

// Button click toggle
document.addEventListener("DOMContentLoaded", () => {
  // Apply saved language when page loads
  updateLanguage(currentLang);

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      updateLanguage(currentLang === "en" ? "hi" : "en");
    });
  }
});
