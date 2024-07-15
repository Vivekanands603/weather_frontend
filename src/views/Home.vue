<template>
  <div class="home-page">
    <!-- Conditional rendering of splash screen -->
    <div v-if="isLoading" class="splash-screen">
      <p class="waiting-message">{{ waitingMessage }}</p>
    </div>

    <!-- Actual content to display after loading -->
    <div v-else class="container">
      <div class="card-container">
        <WeatherCard
          v-if="weather && weatherIcon && hourlyForecast.length > 0"
          :weather="weather"
          :city="city"
          :weatherIcon="weatherIcon"
        />
      </div>
      <div class="card-container">
        <div class="forecast-text-container">
          <WeatherForecast
            v-if="hourlyForecast.length > 0"
            :hourlyForecast="hourlyForecast"
          />
          <div class="text-content text-white">
            <h2 class="font-bold text-xl">Random Text</h2>
            <p class="font-medium">
              Improve him believe opinion offered met and end cheered forbade.
              Friendly as stronger speedily by recurred. Son interest wandered
              sir addition end say. Manners beloved affixed picture men ask.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeatherForecast from "@/components/WeatherForecast.vue";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    WeatherCard,
    WeatherForecast,
  },
  setup() {
    const weather = ref(null);
    const hourlyForecast = ref([]);
    const city = ref("Chennai");
    const weatherIcon = ref("");
    const isLoading = ref(true); // Flag to track loading state

    const fetchWeather = async () => {
      try {
        const apiKey = "b8717341693188ef6b6f19da20911f58";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
        );
        weather.value = response.data;
        weatherIcon.value = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchHourlyForecast = async () => {
      try {
        const apiKey = "b8717341693188ef6b6f19da20911f58";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&units=metric`
        );
        hourlyForecast.value = response.data.list.slice(0, 10).map((item) => ({
          time: item.dt,
          temperature: item.main.temp,
          icon: item.weather[0].icon,
        }));
      } catch (error) {
        console.error("Error fetching hourly forecast data:", error);
      }
    };

    onMounted(async () => {
      await Promise.all([fetchWeather(), fetchHourlyForecast()]);
      isLoading.value = false; // Set loading state to false after data is fetched
    });

    const waitingMessage = "Loading..."; // Loading message

    return {
      weather,
      hourlyForecast,
      city,
      weatherIcon,
      isLoading,
      waitingMessage,
    };
  },
};
</script>

<style scoped>
.home-page {
  background: url("@/assets/bg.jpg") no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff; /* Adjust background color as needed */
}

.illustration {
  max-width: 80%;
  max-height: 80%;
  /* Add any additional styles for your illustration */
}

.waiting-message {
  font-size: 24px; /* Adjust font size as needed */
  margin-top: 16px; /* Adjust spacing as needed */
  /* Add any additional styles for your waiting message */
}

.container {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forecast-text-container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.text-content {
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;
  height: 50%;
}

.text-content h2 {
  font-size: 1.25rem; /* Default size */
}

.text-content p {
  font-size: 1rem; /* Default size */
}

@media (min-width: 1024px) {
  .container {
    flex-direction: row;
  }

  .card-container {
    height: 65vh;
  }

  .text-content h2 {
    font-size: 1.5rem; /* Reduced size for laptops */
  }

  .text-content p {
    font-size: 1.125rem; /* Reduced size for laptops */
  }
}

@media (max-width: 1023px) {
  .container {
    flex-direction: column;
  }

  .card-container {
    height: auto;
  }

  .forecast-text-container {
    height: auto;
  }

  .text-content h2 {
    font-size: 1.25rem; /* Adjusted size for tablets */
  }

  .text-content p {
    font-size: 1rem; /* Adjusted size for tablets */
  }
}

@media (max-width: 768px) {
  .text-content h2 {
    font-size: 1rem; /* Adjusted size for large phones */
  }

  .text-content p {
    font-size: 0.875rem; /* Adjusted size for large phones */
  }
}

@media (max-width: 480px) {
  .text-content h2 {
    font-size: 0.875rem; /* Adjusted size for small phones */
  }

  .text-content p {
    font-size: 0.75rem; /* Adjusted size for small phones */
  }
}
</style>
