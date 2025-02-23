const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const dustLayer = document.querySelector('.dust-layer');
    const sparkleCount = 50; // Number of gold dust particles

    // Generate initial gold dust particles
    function createDustParticles() {
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Random position within the viewport
            const x = Math.random() * 100; // 0-100% of width
            const y = Math.random() * 100; // 0-100% of height

            sparkle.style.left = `${x}vw`;
            sparkle.style.top = `${y}vh`;

            // Random size and animation delay/duration
            const size = Math.random() * 8 + 2; // 2-10px
            const delay = Math.random() * 2; // 0-2s delay
            const duration = Math.random() * 2 + 1; // 1-3s duration

            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.animation = `shimmer ${duration}s infinite ease-in-out`;
            sparkle.style.animationDelay = `${delay}s`;

            dustLayer.appendChild(sparkle);
        }
    }

    // Create particles on load
    createDustParticles();
});

search.addEventListener('click', () => {

    const APIKey = '5e1fd7cf256ffe4dd549edacd6df23bb';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/sun.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});