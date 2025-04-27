# 30th Birthday Celebration Website

A beautiful, interactive website for a 30th birthday celebration featuring a countdown timer, location map, photo gallery, and Spotify playlist integration.

## Features

- Countdown timer to the event
- Interactive map showing the venue location
- Photo gallery with lightbox effect
- Spotify playlist integration with song request form
- Responsive design for all devices

## Setup Instructions

1. Clone this repository to your local machine
2. Create an `images` folder and add your photos:
   - Add a header background image as `header-bg.jpg`
   - Add your gallery photos as `photo1.jpg`, `photo2.jpg`, etc.

3. Customize the website:
   - Update the event date in `script.js` (line 3)
   - Update the venue coordinates in `script.js` (lines 24 and 28)
   - Update the venue details in `index.html`
   - Add your Spotify playlist ID in `index.html`
   - Add your gallery items in `script.js`

4. For the Spotify integration:
   - Create a Spotify playlist
   - Get your playlist ID from the Spotify URL
   - Replace `[YOUR_PLAYLIST_ID]` in the iframe src with your actual playlist ID

## Customization

### Changing Colors
Edit the `styles.css` file to modify:
- Background colors
- Text colors
- Button styles
- Card backgrounds

### Adding Photos
1. Add your photos to the `images` folder
2. Update the `galleryItems` array in `script.js` with your photo information

### Modifying the Countdown
The countdown timer is set in `script.js`. Update the date in the `updateCountdown` function to match your event date.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Leaflet.js for maps
- Lightbox2 for gallery
- Spotify Embed API

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License. 