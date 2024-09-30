<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PencilIcon } from "@heroicons/vue/24/outline";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const homeData = ref(null);
const route = useRoute();
const editingField = ref(null);
const newValue = ref("");

onMounted(() => {
  const homeId = parseInt(route.params.id);
  const storedData = getLocalStorageData();
  const home = storedData.find(item => item.id === homeId);
  homeData.value = home;
});

const getLocalStorageData = () => {
  const storedData = localStorage.getItem('homeData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
};

const editValue = (field) => {
  editingField.value = field;
  newValue.value = homeData.value[field];
};

const saveEditValue = () => {
  if (homeData.value) {
    homeData.value[editingField.value] = newValue.value;
    localStorage.setItem('homeData', JSON.stringify(getLocalStorageData()));
    editingField.value = null;
  }
};
</script>

<template>
  <div class="bg-gray-300">
    <div v-if="homeData" class="flex flex-col justify-center h-screen w-1/2 m-auto ">
      <div class="border rounded-md shadow-xl p-4 bg-white">
        <div class="border-b p-1 mb-2">
          <ArrowLeftIcon class="w-6" @click="$router.back()" />
        </div>
        <img :src="homeData.image" :alt="homeData.name" class="w-1/3" />
        <div>
          <div class="flex justify-between">
            <p class="mt-4">Name : {{ homeData.name }}</p>
            <PencilIcon class="w-6 cursor-pointer" @click="editValue('name')" />
          </div>
          <div class="flex justify-between">
            <p class="mt-2">Price : ${{ homeData.price }}</p>
            <PencilIcon class="w-6 cursor-pointer" @click="editValue('price')">edit</PencilIcon>
          </div>
          <div class="flex justify-between">
            <p class="mt-2">Available : {{ homeData.available ? 'Yes' : 'No' }}</p>
            <PencilIcon class="w-6 cursor-pointer" @click="editValue('available')" />
          </div>
          <div class="border p-2 flex justify-between">
            <p class="mt-1">Description : {{ homeData.description }}</p>
            <PencilIcon class="w-6 cursor-pointer" @click="editValue('description')" />
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="editingField" class="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div class="bg-white p-4 rounded-md shadow-lg flex justify-between">
            <input v-model="newValue" class="border mx-2 p-2 rounded" />
            <div class="flex justify-evenly mr-2">
              <button @click="saveEditValue" class="bg-green-500 text-white p-2 rounded-md mr-1">Save</button>
              <button @click="editingField = null" class="bg-red-500 text-white p-2 rounded-md mr-1">Cancel</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      No house found...
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>