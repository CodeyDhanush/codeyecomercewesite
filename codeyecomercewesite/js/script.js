// Dummy data for products
const products = [
    { name: "Apple", price: 3, location: { lat: 40.7128, long: -74.0060 } },
    { name: "Banana", price: 2, location: { lat: 34.0522, long: -118.2437 } },
    { name: "Carrot", price: 1, location: { lat: 51.5074, long: -0.1278 } },
];

// Function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1, long1, lat2, long2) {
    const R = 6371; // Radius of the Earth in KM
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLong = (long2 - long1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLong / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Handle product filtering
document.getElementById("location-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const maxDistance = parseFloat(document.getElementById("max-distance").value);
    const userLat = 40.7128; // Replace with real user latitude
    const userLong = -74.0060; // Replace with real user longitude

    const filteredProducts = products.filter(product => {
        const distance = calculateDistance(userLat, userLong, product.location.lat, product.location.long);
        return distance <= maxDistance;
    });

    displayProducts(filteredProducts, "products-list");
});

// Function to display products
function displayProducts(productArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    productArray.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
        `;
        container.appendChild(productCard);
    });
}

// Display all products on page load
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products, "products-list");
});
