import {cube} from './js/math'

// 引入css
import './assets/css/style.css'
// import logo from './assets/img/logo.jpg'
// 引入json
import data from './assets/json/data.json' // 已经解析成js对象

document.write('Hello webpack')
document.write('<br> 4的立方: '+cube(4))
document.write('<br> '+JSON.stringify(data))
