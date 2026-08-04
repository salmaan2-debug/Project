
function setupFilter() {

    const filterInput = document.getElementById('filter-input');
    const noResults = document.getElementById('no-results');

    if (!filterInput) {
        return;
    }

    const cards = document.querySelectorAll('.project-card, .post-card');

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

};

setupFilter();