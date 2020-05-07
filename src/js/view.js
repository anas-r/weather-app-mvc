import {$, $_} from "./_util";

export class View {
    constructor() {
        this.card = $('#root');

        // Form creation.
        this.form = $_('form');
        this.form.id = "search-city";

        const label = $_('label');
        label.for = "search-city";

        this.input = $_('input');
        this.input.type = "text";
        this.input.placeholder = "Search a city..."

        const searchButton = $_('button');
        searchButton.innerHTML = '<i class="fas fa-search"></i>'

        label.append(this.input,searchButton);
        this.form.append(label);

        // General weather.
        this.icon = $_('img','icon');
        this.city = $_('h3');
        this.city.textContent = 'Paris';
        this.description = $_('h5');
        this.description.textContent = "Clouds";
        this.temperature = $_('h1');
        this.temperature.textContent = "75 °F";

        // Air condition.
        const airWrapper = $_('div','air-wrapper');
        const airIcons = {
            humidity: $_('i','fas fa-tint'),
            pressure: $_('i','fas fa-wind'),
            speed: $_('i','fas fa-fan')
        }
        this.airValues = {
            humidity: $_('span','air-value'),
            pressure: $_('span','air-value'),
            speed: $_('span','air-value')
        }

        this.airValues.humidity.textContent = '50 %';
        this.airValues.pressure.textContent = '1018 HPa';
        this.airValues.speed.textContent = '15 m/s';

        airWrapper.append(airIcons.humidity,airIcons.pressure,airIcons.speed);
        airWrapper.append(this.airValues.humidity,this.airValues.pressure,this.airValues.speed);

        // Unit toggle.
        const unitSwitcher = $_('label','units');

        this.celsiusSwitch = $_('input','unit celsius');
        const celsiusSwitchText = $_('span');
        celsiusSwitchText.textContent = '°C';
        this.celsiusSwitch.type = 'radio';
        this.celsiusSwitch.name = 'unit-switcher';
        this.celsiusSwitch.checked = true;
        this.oldCelsiusSwitch = true;

        this.fahrenheitSwitch = $_('input','unit fahrenheit');
        const fahrenheitSwitchText = $_('span');
        fahrenheitSwitchText.textContent = '°F';
        this.fahrenheitSwitch.type = 'radio'
        this.fahrenheitSwitch.name = 'unit-switcher';
        this.oldFahrenheitSwitch = false;

        unitSwitcher.append(celsiusSwitchText,this.celsiusSwitch,this.fahrenheitSwitch,fahrenheitSwitchText);

        // Appending everything.
        this.card.append(this.form,this.icon,this.city,this.description,this.temperature,airWrapper,unitSwitcher);
    }

    updateView(weather) {
        this.icon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        this.city.textContent = weather.city;
        this.description.textContent = weather.description;
        this.temperature.textContent = `${Math.round(weather.measure)} ${((weather.unit === "metric" ? "°C" : "°F"))}`;
        this.airValues.humidity.textContent = `${weather.air.humidity} %`;
        this.airValues.pressure.textContent = `${weather.air.pressure} hPa`;
        this.airValues.speed.textContent = `${weather.air.speed} ${((weather.unit === "metric" ? "m/s" : "mph"))}`;
    }

    updateBackground(bg) {
        console.log(bg);
        $('#background').style.backgroundImage = `url('${bg})`;
    }

    bindCitySearch(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const city = this.input.value;
            handler(city);
        })
    }

    bindUnitSwitch(handler) {
        this.celsiusSwitch.addEventListener('click', event => {
            const _unit = event.target.className;
            if (this.oldCelsiusSwitch) return;
            (_unit.match(/celsius/)) && handler("metric");
            this.oldCelsiusSwitch = !this.oldCelsiusSwitch;
            this.oldFahrenheitSwitch = !this.oldFahrenheitSwitch;
        })

        this.fahrenheitSwitch.addEventListener('click', event => {
            const _unit = event.target.className;
            if (this.oldFahrenheitSwitch) return;
            (_unit.match(/fahrenheit/)) && handler("imperial");
            this.oldCelsiusSwitch = !this.oldCelsiusSwitch;
            this.oldFahrenheitSwitch = !this.oldFahrenheitSwitch;
        })
    }
}