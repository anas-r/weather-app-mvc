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
        this.bg = 'https://pixabay.com/get/57e0d74b4e52b108f5d084609629317a163fdce25a4c704c7d2773d39548c55c_1280.jpg)';
     }

     bindWeatherUpdated(callback) {
         this.onWeatherUpdated = callback;
     }

     bindBackgroundUpdated(callback) {
         this.onBackgroundUpdated = callback;
     }

     _commit() {
        console.log(this.city,this.measure,this.unit);
        this.onWeatherUpdated(this);
        this.onBackgroundUpdated(this.bg);
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