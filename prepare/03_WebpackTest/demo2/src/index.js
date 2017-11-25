import $ from 'jquery'
import {cube} from "./js/math"
import data from './assets/json/data.json'
import './assets/css/style.css'

document.write("Hello atguigu")
document.write('<br />' + cube(3))
document.write('<br />' + JSON.stringify(data))

$('body').css('background', 'gray')
