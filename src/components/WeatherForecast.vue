<template>
  <div
    class="weather-forecast grid grid-cols-5 gap-1 sm:gap-2 md:gap-4 lg:gap-6 p-2 bg-white rounded-lg shadow-lg w-full max-w-4xl"
  >
    <div
      class="forecast-item flex flex-col items-center justify-center p-1 rounded-lg"
      v-for="(hour, index) in hourlyForecast.slice(0, 10)"
      :key="index"
    >
      <div
        class="hour font-bold text-sm md:text-sm lg:text-base xl:text-lg text-nowrap"
      >
        {{ index === 0 ? "Now" : formatTime(hour.time) }}
      </div>
      <div class="icon mt-1">
        <img
          :src="getWeatherIcon(hour.icon)"
          alt="Weather Icon"
          class="w-6 h-6 md:w-8 md:h-8"
        />
      </div>
      <div class="temp text-xs md:text-sm lg:text-sm xl:text-base">
        {{ hour.temperature }}°
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherForecast",
  props: {
    hourlyForecast: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000); // Convert to milliseconds
      let hours = date.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // the hour '0' should be '12'
      return `${hours} ${ampm}`;
    },
    getWeatherIcon(iconCode) {
      return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    },
  },
};
</script>

<style scoped>
.weather-forecast {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(50px);
  border-radius: 10px;
}

.forecast-item {
  text-align: center;
  color: #ffffff;
  padding: 4px;
}

.icon img {
  width: 24px;
  height: 24px;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 450px) {
  .forecast-item {
    padding: 1px; /* Reduce padding for smaller screens */
  }
  .hour {
    font-size: 0.6rem; /* Smaller font size for smaller screens */
  }
  .temp {
    font-size: 0.6rem; /* Smaller font size for smaller screens */
  }
  .icon img {
    width: 14px; /* Smaller icon for smaller screens */
    height: 14px;
  }
}

/* Additional adjustments for screens 320px and below */
@media (max-width: 320px) {
  .forecast-item {
    padding: 0.5px; /* Further reduce padding for very small screens */
  }
  .hour {
    font-size: 0.5rem; /* Smaller font size for very small screens */
  }
  .temp {
    font-size: 0.5rem; /* Smaller font size for very small screens */
  }
  .icon img {
    width: 12px; /* Smaller icon for very small screens */
    height: 12px;
  }
}
</style>
