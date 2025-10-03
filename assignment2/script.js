const button = document.getElementById('load-fox'); // Button
const container = document.getElementById('fox-container'); // Container for foxes

// Get a random fox from the API
async function fetchFox() {
    try {
        const response = await fetch('https://randomfox.ca/floof/'); // Request data
        const data = await response.json(); // Turn it into JSON
        return data; // Return the data
    } catch (error) {
        console.error("Error fetching fox:", error);
        return null;
    }
}

// Make a card to show the fox
function createFoxCard(foxData) {
    const card = document.createElement('div'); 
    card.classList.add('fox-card');
    card.innerHTML = `
        <img src="${foxData.image}" alt="Random Fox">
        <a href="${foxData.link}" target="_blank">View Source</a>
    `;
    container.appendChild(card); // Add card to page
}

// When button is clicked, fetch and show a fox
button.addEventListener('click', async () => {
    const fox = await fetchFox();
    if (fox) createFoxCard(fox);
});
