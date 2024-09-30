<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  onClose: () => void;
  onAddHome: (home: { name: string; price: number; description: string; }) => void;
}>();

const name = ref('');
const price = ref(0);
const description = ref('');

const addHome = () => {
  if (name.value && price.value && description.value) {
    props.onAddHome({ name: name.value, price: Number(price.value), description: description.value });
    closeModal();
  }
};

const closeModal = () => {
  props.onClose();
};


</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-md p-4 w-1/3">
      <h2 class="text-xl mb-4">Add a house</h2>
      <input v-model="name" placeholder="Name" class="border mb-2 p-2 w-full" />
      <input v-model="price" placeholder="Price" type="number" class="border mb-2 p-2 w-full" />
      <textarea v-model="description" placeholder="Description" class="border mb-2 p-2 w-full"></textarea>
      <button @click="addHome" class="green text-white px-4 py-2">Next</button>
      <button @click="closeModal" class="bg-red-500 text-white px-4 py-2 ml-2">Cancel</button>
    </div>
  </div>
</template>

<style scoped>

</style>