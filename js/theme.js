document.addEventListener('DOMContentLoaded', function() {

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