import {KEY} from "./_api.config";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindCitySearch(this.onCitySearch);
        this.view.bindUnitSwitch(this.onUnitSwitch);

        this.model.bindWeatherUpdated(this.onWeatherUpdated);
        this.model.bindBackgroundUpdated(this.onBackgroundUpdated);

        this.onCitySearch(this.model.city);
        this.onBackgroundUpdated(this.model.bg);
    }

    _fetchWeatherAPI = (city,unit) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY.WEATHER}&units=${unit}`)
            .then(response => response.json())
    }

    _fetchPixabayAPI = (city) => {
        return fetch(`https://pixabay.com/api/?key=${KEY.PIXABAY}&q=${city}&image_type=photo&pretty=true`)
            .then(response => response.json())
    }

    onCitySearch = (city) => {
        const data = this._fetchWeatherAPI(city,this.model.unit);
        data.then(data => this.model.updateWeather(data, this.model.unit))

        const image = this._fetchPixabayAPI(city)
        image.then(data => data.hits[0].largeImageURL)
/*
            .then(data =>{console.log(data); return data})
*/
            .then(image => this.model.updateBackground(image))
    }

    onUnitSwitch = (unit) => {
        const data = this._fetchWeatherAPI(this.model.city,unit);
        data.then(data => this.model.updateWeather(data,unit));
    }

    onWeatherUpdated = (weather) => {
        this.view.updateView(weather);
    }

    onBackgroundUpdated = (bg) => {
        this.view.updateBackground(bg);
    }
}