import {KEY} from "./_api.config";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindCitySearch(this.onCitySearch);
        this.view.bindUnitSwitch(this.onUnitSwitch);

        this.model.bindWeatherUpdated(this.onWeatherUpdated);

        this.onCitySearch(this.model.city);
    }

    _fetchWeatherAPI = (city,unit) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY.WEATHER}&units=${unit}`)
            .then(response => response.json())
    }

    onCitySearch = (city) => {
        const data = this._fetchWeatherAPI(city,this.model.unit);
        data.then(data => this.model.updateWeather(data, this.model.unit));
    }

    onUnitSwitch = (unit) => {
        const data = this._fetchWeatherAPI(this.model.city,unit);
        data.then(data => this.model.updateWeather(data,unit));
    }

    onWeatherUpdated = (weather) => {
        this.view.updateView(weather);
    }
}