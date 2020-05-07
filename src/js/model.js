export class Model {
     constructor() {
        this.icon = '';
        this.city = 'Paris';
        this.description = '';
        this.measure = '0';
        this.unit = 'metric';
        this.air = {
            humidity: '0',
            pressure: '0',
            speed: '0'
        }
        this.bg = '';
     }

     bindWeatherUpdated(callback) {
         this.onWeatherUpdated = callback;
     }

     _commit() {
        console.log(this.city,this.measure,this.unit);
        this.onWeatherUpdated(this);
     }


     updateWeather(weather, unit) {
         this.icon = weather.weather[0].icon;
         this.city = weather.name;
         this.description = weather.weather[0].description;
         this.measure = weather.main.temp;
         this.unit = unit;
         this.air = {
             humidity: weather.main.humidity,
             pressure: weather.main.pressure,
             speed: weather.wind.speed
         }

         this._commit();
     }


     updateBackground(bg) {
         this.bg = bg;

         this._commit();
     }

}