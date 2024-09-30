<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, watch } from 'vue';
import { useRouter } from "vue-router";

const dataHome = ref([]);
const dataHomeFiltered = ref([]);
const router = useRouter();

const props = defineProps<{
  searchHome: string;
}>();

onMounted(() => {
  const storedData = getLocalStorageData();
  if (storedData.length > 0) {
    dataHome.value = storedData;
    dataHomeFiltered.value = storedData;
    return;
  }

  axios.get('https://jsonplaceholder.typicode.com/photos', {
    params: {
      _limit: 20
    }
  })
      .then(response => {
        dataHome.value = response.data.map(home => ({
          id: home.id,
          name: home.title,
          price: Math.floor(Math.random() * 10000),
          available: true,
          description: 'Une maison',
          image: home.url
        }));
        dataHomeFiltered.value = dataHome.value;
        saveToLocalStorage(dataHome.value);
      })
      .catch(error => console.log(error));
});


const saveToLocalStorage = (data) => {
  localStorage.setItem('homeData', JSON.stringify(data));
};


const showDetails = (id) => {
  router.push(`/home-details/${id}`);
};


const getLocalStorageData = () => {
  const storedData = localStorage.getItem('homeData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
};


watch(() => props.searchHome, (newValue) => {
  filterHome(newValue);
});


const filterHome = (searchValue) => {
  if (searchValue === '') {
    dataHomeFiltered.value = dataHome.value;
  } else {
    dataHomeFiltered.value = dataHome.value.filter(home =>
        home.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
};
</script>

<template>
  <div class="bg-gray-400">
    <ul class="grid grid-cols-4 gap-4 p-4">
      <li v-for="home in dataHomeFiltered" :key="home.id" class="bg-white rounded-md shadow-md p-4 cursor-pointer"
          @click="showDetails(home.id)">
        <img :src="home.image" :alt="home.name">
        <p><span class="font-bold">Name</span> : {{ home.name }}</p>
        <p><span class="font-bold">Price</span> : {{ home.price }}</p>
        <p><span class="font-bold">Description</span> : {{ home.description }}</p>
        <p><span class="font-bold">Available</span> : {{ home.available ? 'Yes' : 'No' }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>