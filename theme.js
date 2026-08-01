document.addEventListener('DOMContentLoaded', function() {

    const ToggleBtn = document.getElementById('theme-toggle');


    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        ToggleBtn.innerHTML = theme === 'dark' ? '<i class="fa fa-moon"></i>' : '<i class="fa fa-sun"></i>';
        localStorage.setItem('theme', theme);
    }

    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme('light');
        }
    }

    ToggleBtn.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    loadSavedTheme();
});