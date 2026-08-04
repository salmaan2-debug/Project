// Theme loader script: applies the saved theme from localStorage when the page loads.
document.addEventListener('DOMContentLoaded', function() {

    // Retrieve the saved theme and apply it. If there is no saved theme, default to light.
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme('light');
        }
    }

    loadSavedTheme();
});