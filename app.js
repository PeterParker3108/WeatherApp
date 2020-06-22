const zipCode = document.getElementById('zip');
const countryCode = document.getElementById('country-code');
const feeling = document.querySelector('#content p');
const generateBtn = document.getElementById('generate');
const iconElement = document.getElementById('iconID');
const tempElement = document.querySelector('#temp p');
const description = document.querySelector('#description p');
const date = document.getElementById('date');
const locationElement = document.querySelector('#location p');
const key = '181b051a3f58f6341c9974b8066dd07b';
const KELVIN = 273;
let d = new Date();
let newDate = d.getDate() + ' / ' + d.getMonth() + ' / ' + d.getFullYear();
const weather = {}

weather.temperature = {
    unit: 'celsius'
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconID}.png">`;

    tempElement.innerHTML = `${weather.temperature.value} &#176 <span>c</span>`;

    description.innerHTML = `${weather.description}`;

    date.innerHTML = newDate;

    if (weather.feeling === undefined) {
        feelings.innerHTML = ` - `;
    } else {
        feelings.innerHTML = `We have heard that you said - \n${weather.feeling} \n Never Lose Hope`;
    }

    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

tempElement.addEventListener('click', function() {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === 'celsius') {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}&#176 <span>F</span>`;
        weather.temperature.unit = 'fahrenheit';
    } else {
        tempElement.innerHTML = `${weather.temperature.value}&#176 <sapn>C</span>`;
        weather.temperature.unit = 'celsius';
    }
});









// get request
const getData = async(url = '') => {
    const response = await fetch(url);

    try {
        const data = response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

generateBtn.addEventListener('click', function() {
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value},${countryCode.value}&appid=${key}`;
    getData(url)
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconID = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        })
});