<template>
  <div class="card-neumorph mb-6">
    <h2 class="text-xl font-semibold mb-2">{{ weather.name }}</h2>
    <div class="flex items-center gap-4 mb-2">
      <img
        :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        class="w-16 h-16"
        alt="icon"
      />
      <p class="capitalize text-lg">{{ weather.weather[0].description }}</p>
    </div>
    <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
      <p>
        🌡️ Temp: <span class="font-medium">{{ weather.main.temp }}°C</span>
      </p>
      <p>
        💧 Humidity:
        <span class="font-medium">{{ weather.main.humidity }}%</span>
      </p>
      <p>
        🌬️ Wind: <span class="font-medium">{{ weather.wind.speed }} m/s</span>
      </p>
      <p>
        🔻 Feels like:
        <span class="font-medium">{{ weather.main.feels_like }}°C</span>
      </p>
      <p>
        🌅 Sunrise:
        <span class="font-medium">{{
          formatTime(weather.sys.sunrise, weather.timezone)
        }}</span>
      </p>
      <p>
        🌇 Sunset:
        <span class="font-medium">{{
          formatTime(weather.sys.sunset, weather.timezone)
        }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weather: Object,
});

const formatTime = (unixTime, timezoneOffset) => {
  const localTime = new Date((unixTime + timezoneOffset) * 1000);
  return localTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
