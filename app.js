let url = "https://api.openweathermap.org/data/2.5/";
let key = '6a1016c70d059543ffeab4e84106ef1f';

let displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;
    let temprate = document.querySelector('.temprate');
    temprate.innerText = `${Math.round(result.main.temp)}°C`;
    let descriptions = document.querySelector('.description');
    descriptions.innerText = result.weather[0].description;
    let ranges = document.querySelector('.range');
    ranges.innerText = `${Math.round(result.main.temp_min)}°C Sıcaklık / ${Math.round(result.main.temp_max)}°C Hissedilen`;
    setBackground(result.name);
};
let setBackground = (cityName) => {
    let body = document.querySelector('body');
    let backgroundUrl = `https://source.unsplash.com/1600x900/?${cityName}`;

    body.style.backgroundImage = `url('${backgroundUrl}')`;
};

let displayError = () => {
    let errorText = document.querySelector('.error-text');
    errorText.innerText = 'Yanlış terim girdiniz. Lütfen tekrar deneyin.';
};

let getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
        .then(weather => {
            if (weather.ok) {
                return weather.json();
            } else {
                throw new Error('Yanlış terim girdiniz.');
            }
        })
        .then(displayResult)
        .catch(() => {
            displayError();
        });
};

let setQuery = (event) => {
    if (event.keyCode === 13) {
        let searchsBar = document.getElementById('searchBar');
        let searchTerm = searchsBar.value;

        // Temizleme işlemi
        let errorText = document.querySelector('.error-text');
        errorText.innerText = '';

        if (searchTerm.trim() !== '') {
            getResult(searchTerm);
        } else {
            displayError();
        }
    }
};

let searchsBar = document.getElementById('searchBar');
searchsBar.addEventListener('keypress', setQuery);
window.onload = function () {
    getResult('Istanbul'); // İstanbul'un hava durumu bilgilerini getir
};
