
// Live filter script: filters visible cards on the page as the user types.
function setupFilter() {
    const filterInput = document.getElementById('filter-input');
    const noResults = document.getElementById('no-results');

    // Exit early when there is no search input on the current page.
    if (!filterInput) {
        return;
    }

    // Search both project cards and blog post cards when present.
    const cards = document.querySelectorAll('.project-card, .post-card');

    // Update the visible cards whenever the user types in the search field.
    filterInput.addEventListener('input', function() {
        const query = filterInput.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
            const title = (card.querySelector('h2') || card.querySelector('h3'))?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';

            if (title.includes(query) || description.includes(query)) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0 && noResults) {
            noResults.style.display = 'block';
        } else if (noResults) {
            noResults.style.display = 'none';
        }
    });
}

// Start filter setup immediately so the search works on load.
setupFilter();