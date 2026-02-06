// Paris Restaurant Map - Vanilla JavaScript Implementation

class ParisRestaurantMap {
    constructor() {
        this.map = null;
        this.restaurants = [];
        this.filteredRestaurants = [];
        this.activeFilters = {
            types: [],
            cuisines: [],
            budgets: [],
            arrondissements: []
        };
        this.currentSort = 'name';
        this.markers = [];
        this.selectedRestaurant = null;
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadData();
        this.initMap();
        this.renderRestaurants();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.filterRestaurants(e.target.value);
        });

        // Filter modal
        const filterBtn = document.getElementById('filterBtn');
        const modal = document.getElementById('filterModal');
        const closeModal = document.getElementById('closeModal');
        const cancelFilters = document.getElementById('cancelFilters');
        const applyFilters = document.getElementById('applyFilters');
        const resetFilters = document.getElementById('resetFilters');

        filterBtn.addEventListener('click', () => {
            this.openModal(modal);
            this.populateFilterCheckboxes();
        });

        closeModal.addEventListener('click', () => this.closeModal(modal));
        cancelFilters.addEventListener('click', () => this.closeModal(modal));

        applyFilters.addEventListener('click', () => {
            this.updateFilters();
            this.closeModal(modal);
            this.renderRestaurants();
        });

        resetFilters.addEventListener('click', () => {
            this.resetFilters();
            this.renderRestaurants();
        });

        // Sort button
        const sortBtn = document.getElementById('sortBtn');
        sortBtn.addEventListener('click', () => {
            this.toggleSort();
            this.renderRestaurants();
        });
    }

    async loadData() {
        try {
            const response = await fetch('data/restaurants.json');
            this.restaurants = await response.json();
            this.filteredRestaurants = [...this.restaurants];
            this.updateRestaurantsCount();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Impossible de charger les données des restaurants.');
        }
    }

    initMap() {
        // Simple map implementation using Leaflet (lightweight alternative)
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
            this.map = L.map('map').setView([48.8566, 2.3522], 12);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);
            
            this.renderMarkers();
            document.getElementById('loading').classList.add('hidden');
        };
        document.head.appendChild(script);
    }

    renderMarkers() {
        if (!this.map) return;

        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        this.filteredRestaurants.forEach(restaurant => {
            const marker = L.marker([restaurant.lat, restaurant.lon])
                .addTo(this.map)
                .on('click', () => {
                    this.showRestaurantDetail(restaurant);
                });
            
            this.markers.push(marker);
        });
    }

    filterRestaurants(searchTerm = '') {
        const term = searchTerm.toLowerCase().trim();
        
        this.filteredRestaurants = this.restaurants.filter(restaurant => {
            const matchesSearch = restaurant.name.toLowerCase().includes(term) ||
                                restaurant.address.toLowerCase().includes(term) ||
                                restaurant.cuisine.toLowerCase().includes(term);
            
            const matchesFilters = this.checkFilters(restaurant);
            
            return matchesSearch && matchesFilters;
        });
        
        this.updateRestaurantsCount();
        this.renderRestaurants();
        this.renderMarkers();
    }

    checkFilters(restaurant) {
        return (
            (this.activeFilters.types.length === 0 || this.activeFilters.types.includes(restaurant.type)) &&
            (this.activeFilters.cuisines.length === 0 || this.activeFilters.cuisines.includes(restaurant.cuisine)) &&
            (this.activeFilters.budgets.length === 0 || this.activeFilters.budgets.includes(restaurant.budget.toString())) &&
            (this.activeFilters.arrondissements.length === 0 || this.activeFilters.arrondissements.includes(restaurant.arrondissement.toString()))
        );
    }

    updateFilters() {
        const filterGroups = ['type', 'cuisine', 'budget', 'arrondissement'];
        
        filterGroups.forEach(group => {
            const checkboxes = document.querySelectorAll(`input[name="${group}"]:checked`);
            this.activeFilters[group] = Array.from(checkboxes).map(cb => cb.value);
        });
        
        this.updateFilterSummary();
    }

    resetFilters() {
        const filterGroups = ['type', 'cuisine', 'budget', 'arrondissement'];
        
        filterGroups.forEach(group => {
            this.activeFilters[group] = [];
            document.querySelectorAll(`input[name="${group}"]`).forEach(cb => cb.checked = false);
        });
        
        this.updateFilterSummary();
        this.filterRestaurants();
    }

    populateFilterCheckboxes() {
        // Populate filter checkboxes with unique values from data
        const filterGroups = {
            type: [...new Set(this.restaurants.map(r => r.type))],
            cuisine: [...new Set(this.restaurants.map(r => r.cuisine))],
            budget: [...new Set(this.restaurants.map(r => r.budget))],
            arrondissement: [...new Set(this.restaurants.map(r => r.arrondissement))]
        };

        Object.entries(filterGroups).forEach(([group, values]) => {
            values.forEach(value => {
                const checkbox = document.querySelector(`input[name="${group}"][value="${value}"]`);
                if (checkbox) {
                    checkbox.checked = this.activeFilters[group].includes(value.toString());
                }
            });
        });
    }

    updateFilterSummary() {
        const activeFiltersContainer = document.getElementById('activeFilters');
        activeFiltersContainer.innerHTML = '';

        const allFilters = [];
        
        Object.entries(this.activeFilters).forEach(([group, values]) => {
            values.forEach(value => {
                allFilters.push({
                    group: group.charAt(0).toUpperCase() + group.slice(1),
                    value: value
                });
            });
        });

        allFilters.forEach(filter => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip';
            chip.innerHTML = `
                ${filter.value}
                <button class="close" onclick="parisMap.removeFilter('${filter.group}', '${filter.value}')">×</button>
            `;
            activeFiltersContainer.appendChild(chip);
        });
    }

    removeFilter(group, value) {
        this.activeFilters[group.toLowerCase()] = this.activeFilters[group.toLowerCase()].filter(v => v !== value);
        this.updateFilterSummary();
        this.renderRestaurants();
    }

    toggleSort() {
        this.currentSort = this.currentSort === 'name' ? 'rating' : 'name';
        this.filteredRestaurants.sort((a, b) => {
            if (this.currentSort === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                return b.note - a.note;
            }
        });
    }

    renderRestaurants() {
        const restaurantList = document.getElementById('restaurantList');
        restaurantList.innerHTML = '';

        this.filteredRestaurants.forEach(restaurant => {
            const restaurantItem = document.createElement('div');
            restaurantItem.className = 'restaurant-item';
            restaurantItem.innerHTML = `
                <img src="${restaurant.image || 'placeholder.jpg'}" alt="${restaurant.name}" class="restaurant-image">
                <div class="restaurant-info">
                    <h3 class="restaurant-name">${restaurant.name}</h3>
                    <div class="restaurant-meta">
                        <span class="restaurant-type">${restaurant.type}</span>
                        <span class="restaurant-address">
                            ${restaurant.address}
                            <span class="metro-badge">M${restaurant.metro}</span>
                        </span>
                    </div>
                    <div class="restaurant-rating">
                        <span class="rating-number">${restaurant.note.toFixed(1)}</span>
                        <span class="rating-count">(${restaurant.reviews} avis)</span>
                    </div>
                </div>
            `;
            
            restaurantItem.addEventListener('click', () => {
                this.showRestaurantDetail(restaurant);
            });
            
            restaurantList.appendChild(restaurantItem);
        });
    }

    showRestaurantDetail(restaurant) {
        const modal = document.getElementById('restaurantModal');
        const closeBtn = document.getElementById('closeRestaurantModal');
        
        // Populate modal content
        document.getElementById('restaurantName').textContent = restaurant.name;
        document.getElementById('restaurantType').textContent = restaurant.type;
        document.getElementById('restaurantAddress').textContent = restaurant.address;
        document.getElementById('restaurantMetro').textContent = `M${restaurant.metro}`;
        document.getElementById('restaurantRating').textContent = restaurant.note.toFixed(1);
        document.getElementById('restaurantDescription').textContent = restaurant.description;
        
        const image = document.getElementById('restaurantImage');
        image.src = restaurant.image || 'placeholder.jpg';
        image.alt = restaurant.name;
        
        // Show modal
        this.openModal(modal);
        
        // Close modal
        closeBtn.onclick = () => this.closeModal(modal);
        window.onclick = (event) => {
            if (event.target === modal) {
                this.closeModal(modal);
            }
        };
    }

    updateRestaurantsCount() {
        const countElement = document.getElementById('restaurantsCount');
        countElement.textContent = `${this.filteredRestaurants.length} restaurants`;
    }

    openModal(modal) {
        modal.classList.add('active');
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.parisMap = new ParisRestaurantMap();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search
document.getElementById('searchInput').addEventListener('input', debounce((e) => {
    parisMap.filterRestaurants(e.target.value);
}, 300));