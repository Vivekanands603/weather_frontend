<template>
  <div
    class="weather-card flex flex-col justify-center items-center h-full w-auto rounded-xl"
  >
    <div
      v-if="weather && city"
      class="weather-details mt-4 flex flex-col items-center p-6 rounded-xl w-full h-65vw max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
    >
      <div
        class="city-name text-2xl font-bold flex justify-center items-center mb-2 text-center"
      >
        <div>{{ city }}</div>
      </div>
      <div class="weather-icon flex justify-center items-center mb-2">
        <img :src="weatherIcon" alt="Weather Icon" class="weather-icon-img" />
        <p class="temperature text-4xl font-bold">{{ weather.main.temp }}°</p>
      </div>
      <div class="weather-description flex justify-center items-center mb-2">
        <p class="description text-2xl font-bold">
          {{ getWeatherDescription(weather.weather[0].main) }}
        </p>
      </div>
      <div class="date flex justify-center items-center mb-2">
        <p class="date-text text-md font-semibold">
          {{ new Date().getDate() }}
          {{ new Date().toLocaleString("default", { month: "short" }) }}
          {{ new Date().getFullYear() }}
        </p>
      </div>
      <div
        class="additional-info flex flex-wrap gap-4 items-center justify-center text-md font-semibold"
      >
        <p>
          Sunset
          {{
            new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </p>
        <p class="gap-1">|</p>
        <p>Feels Like {{ weather.main.feels_like }}°C</p>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    weather: {
      type: Object,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    weatherIcon: {
      type: String,
      required: true,
    },
  },
  methods: {
    getWeatherDescription(description) {
      return description.charAt(0).toUpperCase() + description.slice(1);
    },
  },
};
</script>

<style scoped>
.weather-card {
  background-color: #00ace6;
}

.weather-details {
  background-color: #00ace6;
}

.city-name,
.weather-icon p,
.weather-description p,
.date p,
.additional-info p {
  color: #007399;
}

.additional-info {
  text-align: center;
}

/* Default font sizes for larger screens */
.city-name {
  font-size: 2rem;
}
.weather-icon p {
  font-size: 4rem;
}
.weather-description p {
  font-size: 2rem;
}
.date p {
  font-size: 1.75rem;
}
.additional-info p {
  font-size: 1rem;
}

/* Responsive font sizes */
@media (max-width: 1024px) {
  .city-name {
    font-size: 1.75rem;
  }
  .weather-icon p {
    font-size: 3.5rem;
  }
  .weather-description p {
    font-size: 1.75rem;
  }
  .date p {
    font-size: 1.5rem;
  }
  .additional-info p {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .city-name {
    font-size: 1.5rem;
  }
  .weather-icon p {
    font-size: 3rem;
  }
  .weather-description p {
    font-size: 1.5rem;
  }
  .date p {
    font-size: 1.25rem;
  }
  .additional-info p {
    font-size: 0.75rem;
  }
}

@media (max-width: 450px) {
  .city-name {
    font-size: 1.25rem;
  }
  .weather-icon p {
    font-size: 2.5rem;
  }
  .weather-description p {
    font-size: 1.25rem;
  }
  .date p {
    font-size: 1rem;
  }
  .additional-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  .additional-info p {
    font-size: 0.625rem;
  }
}

.weather-icon-img {
  width: 4rem;
  height: 4rem;
}
@media (min-width: 640px) {
  .weather-icon-img {
    width: 5rem;
    height: 5rem;
  }
}
@media (min-width: 768px) {
  .weather-icon-img {
    width: 6rem;
    height: 6rem;
  }
}
@media (min-width: 1024px) {
  .weather-icon-img {
    width: 7rem;
    height: 7rem;
  }
}
@media (min-width: 1280px) {
  .weather-icon-img {
    width: 8rem;
    height: 8rem;
  }
}
</style>
