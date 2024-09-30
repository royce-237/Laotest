<script setup lang="ts">
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { ref } from "vue";

const searchHome = ref("");
const emit = defineEmits();

const addHome = () => {
  emit('add');
};

const updateSearch = () => {
  emit('update:searchHome', searchHome.value);
};
</script>

<template>
  <div class="flex justify-between border p-8 rounded">
    <div>
      <HomeIcon class="w-8" />
      <h4>Workcation</h4>
    </div>

    <div class="border border-amber-600 bg-amber-600 flex justify-between p-4 rounded">
      <div class="flex bg-white rounded-xl px-1">
        <MagnifyingGlassIcon class="w-6" />
        <input
            type="text"
            placeholder="Search..."
            class="rounded-xl p-2 outline-0"
            v-model="searchHome"
            @input="updateSearch"
        />
      </div>
      <button class="border rounded-md mx-3 px-2 bg-white" @click="addHome">Add</button>
    </div>
  </div>
</template>

<style scoped>
</style>