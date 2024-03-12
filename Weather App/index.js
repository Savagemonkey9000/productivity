let container = document.querySelector('.container');
let search = document.querySelector('.search button');
let cityHide = document.querySelector('.cityHide');
let weatherBox = document.querySelector('.weather-box');
let weatherDetails = document.querySelector('.weather-details');
let notFound = document.querySelector('.not-found');

let image = document.querySelector('.weather-box img');
let temp = document.querySelector('.weather-box .temp');
let des = document.querySelector('.weather-box .des');
let humidity = document.querySelector('.weather-details .humidity span');
let wind = document.querySelector('.weather-details .wind span');
let infoWeather = document.querySelector('.info-weather');
let infoHumidity = document.querySelector('.info-humidity');
let infoWind = document.querySelector('.wind2');
let cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
let totalCloneInfoWeather = cloneInfoWeather.length;
let cloneInfoWeatherFirst = cloneInfoWeather[0];

let cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
let cloneInfoHumidityFirst = cloneInfoHumidity[0];

let cloneInfoWind = document.querySelectorAll('.wind2.active-clone');
let cloneInfoWindFirst = cloneInfoWind[0];


search.addEventListener('click', () => {

    let APIKey = '4b3b6bb37e315b8580dc3136bdbf50ea';
    let city = document.querySelector('.search input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            notFound.classList.add('active');
            return;
        }

      
        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            notFound.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'bilder/sol.png';
                    break;

                case 'Rain':
                    image.src = 'bilder/regnigt.png';
                    break;

                case 'Snow':
                    image.src = 'bilder/snö.png';
                    break;

                case 'Clouds':
                    image.src = 'bilder/molnigt.png';
                    break;

                case 'Mist':
                    image.src = 'bilder/blåsigt.png';
                    break;

                case 'Haze':
                    image.src = 'bilder/blåsigt.png';
                    break;

                default:
                    image.src = 'bilder/cloud.png';
            }

            temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            des.innerHTML = `${json.weather[0].description}`;

            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

          
            let elCloneInfoWeather = infoWeather.cloneNode(true);
            let elCloneInfoHumidity = infoHumidity.cloneNode(true);
            let elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-wind2';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            let cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            let totalCloneInfoWeather = cloneInfoWeather.length;
            let cloneInfoWeatherFirst = cloneInfoWeather[0];

            let cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            let cloneInfoHumidityFirst = cloneInfoHumidity[0];

            let cloneInfoWind = document.querySelectorAll('.wind2.active-clone');
            let cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }
        }

    });

});
