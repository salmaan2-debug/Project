// Component loader script. Dynamically loads header and footer partials into pages.
function loadComponent(selector, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load component from ${filePath}`);
            }
            return response.text();
        })
        .then(html => {
            document.querySelector(selector).innerHTML = html;
            if (selector === '#header-placeholder') {
                // After the header is loaded, restore the saved theme and wire up the theme toggle.
                const savedTheme = localStorage.getItem('theme') || 'light';
                document.body.setAttribute('data-theme', savedTheme);

                const button = document.getElementById('theme-toggle');

                if (button){
                    button.innerHTML = savedTheme === 'dark' ? '<i class="fa fa-moon"></i>' : '<i class="fa fa-sun"></i>';
                }

                button.addEventListener('click', function() {
                    const currentTheme = document.body.getAttribute('data-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    
                    document.body.setAttribute('data-theme', newTheme);
                    button.innerHTML = newTheme === 'dark' ? '<i class="fa fa-moon"></i>' : '<i class="fa fa-sun"></i>';
                    localStorage.setItem('theme', newTheme);
                });
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load header and footer components when the page is ready.
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('#header-placeholder', 'components/header.html');
    loadComponent('#footer-placeholder', 'components/footer.html');
});