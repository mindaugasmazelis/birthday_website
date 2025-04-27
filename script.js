// Debug: Check if config is loaded
console.log('Config loaded:', CONFIG);

// Initialize page content from config
function initializePage() {
    try {
        DEBUG.log('Initializing page');
        
        // Check if required elements exist
        const requiredElements = {
            'page-title': 'Page title',
            'event-title': 'Event title',
            'countdown': 'Countdown timer',
            'map': 'Map',
            'gallery-grid': 'Gallery grid',
            'spotify-player': 'Spotify player'
        };

        let missingElements = [];
        for (const [id, name] of Object.entries(requiredElements)) {
            if (!document.getElementById(id)) {
                missingElements.push(name);
                DEBUG.error(`Required element not found: ${id}`);
            }
        }

        if (missingElements.length > 0) {
            throw new Error(`Missing required elements: ${missingElements.join(', ')}`);
        }

        // Set page title
        const pageTitle = document.getElementById('page-title');
        const eventTitle = document.getElementById('event-title');
        
        if (pageTitle) pageTitle.textContent = CONFIG.event.title;
        if (eventTitle) eventTitle.textContent = CONFIG.event.title;
        
        DEBUG.log('Page title set', { title: CONFIG.event.title });

        // Show/hide debug button based on config
        const debugButton = document.getElementById('debug-button');
        if (debugButton && CONFIG.debug && CONFIG.debug.buttonVisible) {
            debugButton.style.display = 'block';
            DEBUG.log('Debug button enabled');
        } else {
            DEBUG.log('Debug button disabled by config');
        }

        // Show/hide gallery based on config
        const gallerySection = document.querySelector('.gallery');
        if (gallerySection && CONFIG.gallery && CONFIG.gallery.visible) {
            gallerySection.style.display = 'block';
            DEBUG.log('Gallery section enabled');
        } else {
            DEBUG.log('Gallery section disabled by config');
        }

        // Update venue details
        try {
            const venueDetails = {
                '🕑 Laikas': CONFIG.venue['🕑 Laikas'],
                '🎒 Ką pasiimti': CONFIG.venue['🎒 Ką pasiimti'],
                '🐾 Gyvūnai': CONFIG.venue['🐾 Gyvūnai'],
                '🍗 Maistas': CONFIG.venue['🍗 Maistas'],
                '🍾 Gėrimai': CONFIG.venue['🍾 Gėrimai'],
                '💤 Nakvojimas': CONFIG.venue['💤 Nakvojimas'],
                '🕺 Žmonės': CONFIG.venue['🕺 Žmonės']
            };

            for (const [key, value] of Object.entries(venueDetails)) {
                const elementId = `venue-${key.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
                DEBUG.log(`Processing venue detail: ${key}`, { 
                    originalKey: key,
                    generatedId: elementId,
                    value: value
                });
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = `<strong>${key}</strong>: ${value}`;
                    DEBUG.log(`Updated venue detail: ${key}`, { elementId, value });
                } else {
                    DEBUG.error(`Element not found for venue detail: ${key}`, { 
                        elementId,
                        availableElements: Array.from(document.querySelectorAll('.venue-details p')).map(p => p.id)
                    });
                }
            }
            
            DEBUG.log('Venue details updated');
        } catch (error) {
            DEBUG.error('Error updating venue details', error);
        }

        // Set Spotify player
        document.getElementById('spotify-player').src = 
            `https://open.spotify.com/embed/playlist/${CONFIG.spotify.playlistId}`;

        // Update CSS variables from config
        document.documentElement.style.setProperty('--primary-color', CONFIG.theme.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', CONFIG.theme.secondaryColor);
        document.documentElement.style.setProperty('--background-color', CONFIG.theme.backgroundColor);
        document.documentElement.style.setProperty('--text-color', CONFIG.theme.textColor);

        // Initialize other components
        updateCountdown();
        initializeMap();
        createGallery();
        initializeSpotifyPlayer();

        DEBUG.log('Page initialization completed');
    } catch (error) {
        DEBUG.error('Failed to initialize page', error);
        DEBUG.dumpErrors();
    }
}

// Update countdown every second
function updateCountdown() {
    try {
        const eventDate = new Date(CONFIG.event.date).getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<h2>The event has started!</h2>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        DEBUG.log('Countdown updated', { days, hours, minutes, seconds });

        // Update every second
        setTimeout(updateCountdown, 1000);
    } catch (error) {
        DEBUG.error('Error updating countdown', error);
        document.getElementById('countdown').innerHTML = '<h2>Error updating countdown</h2>';
    }
}

// Map Initialization
function initializeMap() {
    try {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            DEBUG.error('Map element not found');
            return;
        }

        if (!CONFIG.venue.coordinates || !CONFIG.venue.coordinates.lat || !CONFIG.venue.coordinates.lng) {
            DEBUG.error('Invalid venue coordinates in config', CONFIG.venue.coordinates);
            return;
        }

        const map = L.map('map').setView([CONFIG.venue.coordinates.lat, CONFIG.venue.coordinates.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const venueMarker = L.marker([CONFIG.venue.coordinates.lat, CONFIG.venue.coordinates.lng]).addTo(map);
        venueMarker.bindPopup(`<b>${CONFIG.venue.title}</b>`).openPopup();

        DEBUG.log('Map initialized successfully', { coordinates: CONFIG.venue.coordinates });
    } catch (error) {
        DEBUG.error('Error initializing map', error);
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = '<p>Unable to load map. Please try again later.</p>';
        }
    }
}

// Create gallery from configuration
function createGallery() {
    try {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) {
            DEBUG.error('Gallery grid element not found');
            return;
        }
        
        galleryGrid.innerHTML = '';

        DEBUG.log('Creating gallery with items', CONFIG.gallery.items);

        CONFIG.gallery.items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const imagePath = CONFIG.gallery.imagesPath + item.image;
            DEBUG.log('Loading image', { path: imagePath });
            
            galleryItem.innerHTML = `
                <a href="${imagePath}" data-lightbox="gallery" data-title="${item.title} - ${item.description}">
                    <img src="${imagePath}" alt="${item.title}" 
                         onerror="this.onerror=null; this.src='images/placeholder.jpg'; console.error('Failed to load image:', '${imagePath}')">
                </a>
            `;
            galleryGrid.appendChild(galleryItem);
        });

        initializeLightbox();
        DEBUG.log('Gallery created successfully');
    } catch (error) {
        DEBUG.error('Error creating gallery', error);
    }
}

// Initialize Lightbox
function initializeLightbox() {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Image %1 of %2'
    });
}

// Initialize Spotify Player
function initializeSpotifyPlayer() {
    try {
        const spotifyPlayer = document.getElementById('spotify-player');
        if (!spotifyPlayer) {
            DEBUG.error('Spotify player element not found');
            return;
        }

        if (!CONFIG.spotify.playlistId) {
            DEBUG.error('Spotify playlist ID not found in config');
            return;
        }

        spotifyPlayer.src = `https://open.spotify.com/embed/playlist/${CONFIG.spotify.playlistId}`;
        DEBUG.log('Spotify player initialized', { playlistId: CONFIG.spotify.playlistId });
    } catch (error) {
        DEBUG.error('Error initializing Spotify player', error);
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    DEBUG.log('DOM loaded, starting initialization');
    initializePage();
}); 