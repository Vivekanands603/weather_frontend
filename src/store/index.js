import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    weather: null,
  },
  mutations: {
    setWeather(state, weather) {
      state.weather = weather;
    },
  },
  actions: {
    async fetchWeather({ commit }, location) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY`
      );
      commit("setWeather", {
        description: response.data.weather[0].description,
        temperature: (response.data.main.temp - 273.15).toFixed(1),
        icon: response.data.weather[0].icon,
      });
    },
  },
  getters: {
    weather: (state) => state.weather,
  },
});
