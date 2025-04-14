import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';

createApp(App)
  .use(router)
  .mount('#app');







