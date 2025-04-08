<template>
  <div class="w-full max-w-xl card-neumorph">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-blue-500">🌤️ Weather App</h1>
    </div>

    <div class="flex items-center gap-2 mb-4 relative">
      <input
        v-model="city"
        @input="searchSuggestion"
        @keyup.enter="searchWeather"
        placeholder="Search for a city..."
        class="flex-1 input-neumorph focus:outline-none"
      />
      <button @click="searchWeather" class="button-primary">Search</button>
      <ul
        v-if="suggestions.length"
        class="absolute top-full mt-1 left-0 right-0 bg-white shadow rounded z-10 max-h-48 overflow-y-auto"
      >
        <li
          v-for="item in suggestions"
          :key="item"
          @click="selectSuggestion(item)"
          class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="mb-4 text-sm text-gray-600">
      <button @click="getLocation" class="underline">
        📍 Use Current Location
      </button>
    </div>

    <div v-if="history.length" class="mb-4 text-sm">
      <p class="mb-1 font-semibold">Recent Searches:</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in history"
          :key="item"
          class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs hover:bg-blue-200"
          @click="searchFromHistory(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>

    <div
      v-if="weatherStore.loading"
      class="my-4 text-blue-500 text-center animate-pulse"
    >
      Loading...
    </div>

    <WeatherDetail v-if="weatherStore.data" :weather="weatherStore.data" />
    <ForecastList
      v-if="weatherStore.forecast.length"
      :forecast="weatherStore.forecast"
    />

    <p v-if="weatherStore.error" class="text-red-500 mt-4 text-center">
      {{ weatherStore.error }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useWeatherStore } from "@/stores/weather";
import WeatherDetail from "@/components/WeatherDetail.vue";
import ForecastList from "@/components/ForecastList.vue";

const city = ref("");
const suggestions = ref([]);
const history = ref(
  JSON.parse(localStorage.getItem("weather-history") || "[]")
);
const weatherStore = useWeatherStore();

const searchWeather = () => {
  if (city.value.trim()) {
    weatherStore.fetchWeather(city.value);
    if (!history.value.includes(city.value)) {
      history.value.unshift(city.value);
      history.value = history.value.slice(0, 5);
      localStorage.setItem("weather-history", JSON.stringify(history.value));
    }
    suggestions.value = [];
  }
};

const searchFromHistory = (item) => {
  city.value = item;
  searchWeather();
};

const selectSuggestion = (item) => {
  city.value = item;
  suggestions.value = [];
  searchWeather();
};

const searchSuggestion = async () => {
  if (city.value.length < 3) return (suggestions.value = []);
  try {
    const res = await fetch(
      `https://api.teleport.org/api/cities/?search=${city.value}&limit=5`
    );
    const data = await res.json();
    suggestions.value = data._embedded["city:search-results"].map(
      (i) => i.matching_full_name
    );
  } catch (err) {
    suggestions.value = [];
  }
};

const getLocation = () => {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    try {
      await weatherStore.fetchWeatherByCoords(latitude, longitude);
    } catch (e) {
      console.error("Location fetch error", e);
    }
  });
};

</script>
