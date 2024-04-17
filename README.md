# Weather Query Application🌞

This project is focused on creating a simple yet functional weather query application using HTML, CSS, and JavaScript. The application allows users to search for weather information based on the city name.

## Elevator Pitch
A weather web app made with HTML, CSS, JS, and API. Our "Weather Query Application" is here! Just enter your city, and all-weather information is at your glance. Whether sunny or rainy, we ensure weather surprises never spoil your days. Fast, accurate, and handy！

## Feature Overview
This application offers the following key features:
- **City Weather Query**: Users can enter the name of any city to obtain real-time weather information for that city.
- **Data Display**: Displays temperature, wind speed, Humidity, and weather Description.
- **User-Friendly Interface**: A simple and clear interface for an easy and comprehensive reading of data.

## Technical Implementation

This deliverable represents the foundational structure of the Weather Query application. The primary goal was to lay down the HTML structure, ensuring proper organization and semantic meaning in the markup. The subsequent phases will involve styling with CSS, adding interactivity with JavaScript, and integrating backend functionalities.

- **HTML**: Used to build the basic structure of the app, such as input boxes, buttons, and the information display area.
- **CSS**: Enhances the interface with responsive design, ensuring the app looks great on different devices.
- **JavaScript**: Makes network requests using JavaScript to obtain data from a weather service API.

 ## Application Sketch
Below is a basic layout sketch of the application:
<img src="https://i.imgur.com/WO1ml8g.jpeg">
<img src="https://i.imgur.com/uDVt7Rc.jpg" >

## HTML Deliverable

For this deliverable, I focused on building out the structure of my application using HTML. Here's a breakdown of what I included:

### HTML Pages
- **Index Page (`index.html`)**: This is the main page of the application. It provides a search functionality where users can enter a city name to fetch weather information.
- **About Page (`about.html`)**: This page provides information about the Weather Query application.

### Links
- Navigation between the `index.html` and `about.html` is facilitated through links in the navigation bar and the footer.
- Links to the GitHub repository are prominently displayed in the footer to ensure easy access to the source code.

### Text
- Text content has been added to guide the users. For example, instructions on how to use the search functionality and notes about entering city names properly are displayed.

### Images
- A placeholder for weather icons has been added to represent the visual aspect of the weather data. (It will be dynamically updated by JavaScript code based on the results returned by the weather API).

### Database / Login (Placeholder)
- Login functionality is currently represented as a placeholder with input boxes for username and password.
- A section to display user query history is included to mimic data pulled from a database.

### WebSocket (Placeholder)
- A placeholder for real-time weather updates has been set up to illustrate where real-time data, such as live temperature changes will be displayed.

## Future Enhancements
- Integration with a real-time weather API to fetch and display live weather data.
- Implementing user authentication to enable personalized experiences, such as saving user search history.
- Real-time data updates using WebSocket to deliver live weather information.

# CSS Deliverable

For this deliverable, I focused on enhancing the visual appearance of my application by applying CSS styles. 

## Styling Overview

### Header, Footer, and Main Content Body
- **Header and Footer**: I applied a consistent background color and text color to create a unified look across the application. Padding was adjusted for better spacing, and text alignment was set to center for a cleaner appearance.
- **Main Content Body**: Adequate padding was added around the main content area to ensure the text and other elements are not too close to the edge of the browser window, improving readability and aesthetics.

### Navigation Elements
- I removed the underlines from anchor elements within the navigation to create a cleaner look. Additionally, I changed the color of these links to enhance visibility and integrate them more seamlessly with the overall design theme.

### Responsive Design
- My application now adjusts gracefully to different window sizes and devices. I employed media queries to ensure the layout remains functional and visually appealing across a wide range of devices, from mobile phones to desktop monitors.

### Application Elements
- I used good contrast and whitespace throughout the application to make the content easy to read and to visually separate different sections of the app.

### Application Text Content
- Consistent fonts were used across the application to maintain a cohesive look and feel. This consistency helps in reinforcing the application's identity and improves the user experience.

### Application Images
- As of now, the application does not include any images, so no specific styling was applied in this area. However, placeholders for weather icons are prepared to be dynamically updated based on the weather data fetched from the API in future developments.

# JavaScript deliverable
In the JavaScript deliverable I have implemented the basic functionality of the weather query by modifying index.html and history.html and adding a lot of js code, I plan to update the css page later to make it more aesthetically pleasing, here is what I have accomplished.

- **Login** - Users can log in by typing in their name, the login information is stored via localStorage, when you press enter or the login button it stores your username, if you don't type in your username it will show you the mystery user.
- **database** - Managing query history in localStorage satisfies the need for database data in the future.
- **WebSocket** - This code uses the fetchWeather function to fetch weather data, simulating the process of getting real-time data from a server.
- **application logic** - The core interaction logic of the application is implemented through the triggering of weather queries through form submissions, the dynamic display of query results, and the loading and display of query history.

# Service deliverable

My "index.js" configures the Express application and starts an HTTP server.

I used express.static('public') to serve static resources to the front-end files

My front end was calling the api directly to get the weather data, now it's been modified so that I'm getting the data through a backend proxy.

I'm using the /api/weather/:city endpoint to provide a service that allows the front-end to request city-specific weather data through the back-end.

My front end is now calling the /api/weather/:city endpoint set by the back end to get weather data.

# Login/database deliverable

I did the new user registration via the /api/auth/register endpoint.

I did the authentication of existing users via the /api/auth/login endpoint.

I use MongoDB to store user information and query history.

The user's email and bcrypt hashed password are stored in the user's collection in MongoDB.

Use the cookie-parser middleware and manage user sessions by setting cookies.

# Websocket deliverable

In my peerProxy.js, I have successfully created the WebSocket server and am listening for upgrade requests on the HTTP server to establish a WebSocket connection.

In my websocket.js file, I create an instance of a WebSocket client and try to establish a connection with the server.

In the peerProxy.js file, the server periodically sends weather data to all connected clients. Also, in the script.js file, clients can send data via WebSocket after checking the weather, such as the user's query history.

The data received by websocket.js will be processed and displayed in various parts of the page, in addition to the HTML structures in index.html and history.html that display the data.

# React deliverable

I have converted the application to use React.

I using Vite as the build tool.

My project structure includes multiple React components under the src/pages directory with separate components for different parts of the application like Home, Login, Registry, History, and About. Each component has its own JSX file.

I have a routes/index.js file that configures routing for the application.

In App.jsx, I use several hooks including useState, useEffect, and useNavigate.