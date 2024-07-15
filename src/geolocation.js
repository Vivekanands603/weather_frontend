import axios from "axios";

export const getCityNameAndWeather = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const locationResponse = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            const city =
              locationResponse.data.city ||
              locationResponse.data.locality ||
              locationResponse.data.principalSubdivision;

            const apiKey = "b8717341693188ef6b6f19da20911f58";
            const weatherResponse = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );

            const weather = weatherResponse.data;
            const isDaytime = checkIfDaytime(
              weather.sys.sunrise,
              weather.sys.sunset
            );
            const icon = getWeatherIcon(weather.weather[0].id, isDaytime);

            resolve({
              city,
              weather,
              icon,
            });
          } catch (error) {
            console.error("Error fetching location or weather data:", error);
            reject("Error fetching location or weather data.");
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          reject("Error getting geolocation.");
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

const checkIfDaytime = (sunrise, sunset) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= sunrise && currentTime < sunset;
};

const getWeatherIcon = (weatherId, isDaytime) => {
  if (weatherId >= 200 && weatherId < 300) {
    return require("../src/assets/clouds.svg");
  } else if (weatherId >= 300 && weatherId < 600) {
    return require("../src/assets/icons8-rain-50.png");
  } else if (weatherId >= 600 && weatherId < 700) {
    return require("../src/assets/icons8-snow-50.png");
  } else if (weatherId >= 700 && weatherId < 800) {
    return require("../src/assets/humidity.svg");
  } else if (weatherId === 800) {
    return isDaytime
      ? require("../src/assets/icons8-sun.svg")
      : require("../src/assets/icons8-night-50.png"); // Add your night clear icon
  } else if (weatherId > 800) {
    return isDaytime
      ? require("../src/assets/clouds.svg")
      : require("../src/assets/clouds.svg"); // Add your night cloudy icon
  }
  return require("../src/assets/icons8-sun.svg");
};
