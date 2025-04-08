<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div
      v-for="item in forecast"
      :key="item.dt"
      class="card-neumorph text-center"
    >
      <p class="font-semibold text-blue-500">{{ formatDate(item.dt_txt) }}</p>
      <img
        :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
        class="w-12 h-12 mx-auto my-2"
        alt="icon"
      />
      <p class="capitalize mb-1">{{ item.weather[0].description }}</p>
      <p class="text-sm">🌡️ {{ item.main.temp }}°C</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  forecast: Array,
});

const formatDate = (datetime) => {
  return new Date(datetime).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
</script>
