// Blog page script: loads posts from JSON, renders cards, and attaches read-more behavior.
document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('Blog-list');

    fetch('data/posts.json')
        .then(response => response.json())
        .then(posts => {
            // Sort posts by date so the newest post appears first.
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-card');
                postElement.id = `post-${post.id}`;

                const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = new Date(post.date.replace(/-/g, '/')).toLocaleDateString('en-US', dateOptions);

                const Badge = index === 0 ? '<span class="badge">Latest Post</span>' : '';

                postElement.innerHTML = `
                    <h2>${post.title} ${Badge}</h2>
                    <p>${formattedDate} | ${post.category}</p>
                    <p>${post.summary}</p>
                    <button type="button" class="read-more-button">Read More</button>
                    <div class="post-full-content hidden">
                        <p>${post.content}</p>
                    </div>
                `;
                blogList.appendChild(postElement);

                const readMoreButton = postElement.querySelector('.read-more-button');
                const fullContent = postElement.querySelector('.post-full-content');
                readMoreButton.addEventListener('click', () => {
                    const isHidden = fullContent.classList.toggle('hidden');
                    readMoreButton.textContent = isHidden ? 'Read More' : 'Hide';
                });
            });

            // Activate the page filter after the posts are rendered.
            setupFilter();
        })
        .catch(error => console.error('Error loading blog posts:', error));
});