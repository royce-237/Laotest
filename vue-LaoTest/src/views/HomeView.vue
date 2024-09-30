<script setup lang="ts">
import ItemsVue from "@/components/ItemsVue.vue";
import headerVue from "@/components/HeaderVue.vue";
import HomeModal from "@/components/HomeModal.vue";
import {ref} from "vue";


const showModal = ref(false);
const dataHome = ref([]);

// const addHome = (home) =>{
//   const newHome = {
//     id:dataHome.value.length + 1,
//     ...home,
//     available: true
//   };
//   dataHome.value.push(newHome)
// }
</script>

<template >

  <headerVue @add = "showModal = true"/>
  <ItemsVue :dataHome="dataHome"/>
  <HomeModal
  v-if="showModal" :isOpen="showModal" @onClose="showModal = false" @onAddHome="addHome"/>


</template>

<style scoped>

</style>
