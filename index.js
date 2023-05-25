const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const body = document.querySelector('body');

search.addEventListener('click', () => {

    const APIKey = 'd102ce6f8a7f8c61a416505fdeb98697';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
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
                    image.src = 'images/clear.png';
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

            const descriptionMapping = {
                Clear: 'Ensoleillée',
                Rain: 'Pluvieux',
                Snow: 'Neigeux',
                Clouds: 'Nuageux',
                Haze: 'Brumeux',
            };
              
            temperature.innerHTML = `${Math.round(json.main.temp - 273.15)}<span>°C</span>`;

            description.innerHTML = `${json.weather[0].description}`;
            const englishDescription = json.weather[0].main;
            const frenchDescription = descriptionMapping[englishDescription] || englishDescription;
            description.innerHTML = frenchDescription;

            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });
});


function setBackground() {
    const date = new Date();
    const hour = date.getHours();
    const body = document.querySelector("body");
  
    if (hour >= 6 && hour < 12) {
      // matin
      body.style.background = "#F1C40F";
    } else if (hour >= 12 && hour < 18) {
      // après-midi
      body.style.background = "#E67E22";
    } else if (hour >= 18 && hour < 22) {
      // soir
      body.style.background = "#2C3E50";
    } else {
      // nuit
      body.style.background = "#34495E";
    }
}
  
setBackground();