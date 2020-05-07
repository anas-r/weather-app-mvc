// Test import of a JavaScript function, an SVG, and Sass
import './styles/index.scss'
import '@fortawesome/fontawesome-free/js/all.js'
import {Controller} from "./js/controller";
import {Model} from "./js/model";
import {View} from "./js/view";
import {KEY} from './js/_api.config'

const app = new Controller(new Model(), new View());