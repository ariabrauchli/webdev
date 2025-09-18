const button = document.getElementById('load-fox');
const container = document.getElementById('fox-container');

async function fetchFox() {
    try {
        const response = await fetch('https://randomfox.ca/floof/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching fox:", error);
        return null;
    }
}

function createFoxCard(foxData) {
    const card = document.createElement('div');
    card.classList.add('fox-card');
    card.innerHTML = `
        <img src="${foxData.image}" alt="Random Fox">
        <a href="${foxData.link}" target="_blank">View Source</a>
    `;
    container.appendChild(card);
}

button.addEventListener('click', async () => {
    const fox = await fetchFox();
    if (fox) createFoxCard(fox);
});
