<script setup>
import { RouterLink, RouterView } from "vue-router";
import GoTop from "./components/GoTop.vue";

import { ref, onMounted } from 'vue';
import { useAuthStore } from './stores/AuthStore.js';

import AOS from 'aos';
import 'aos/dist/aos.css'

const authStore = useAuthStore();
const login = ref(false);

onMounted(() => {
  const collector = localStorage.getItem('collector');
  login.value = authStore.isLogin;
  
});

</script>

<template>

    <div class="container-fluid">
      <div class="row">
        <div class="col-12 bg-secondary bg-gradient fixed-top" style="top:0">
          <div class="d-flex align-items-center justify-content-end" v-if="!authStore.isLogin"><RouterLink class="text-white link p-1" to="/admin.html">登入</RouterLink></div>  
          <div class="d-flex align-items-center justify-content-end" v-else><a href="#" class="text-white link p-1" @click="authStore.logout" >登出</a></div>
        </div>
        <div class="col-1 h-100 bg-dark bg-gradient position-fixed">
          <div class="row mt-4  ">
            <RouterLink class="col-12 link text-white py-3 border-bottom border-secondary text-center" to="/admin.html"><h3><i class="bi bi-house-door-fill"></i></h3></RouterLink>
            <RouterLink v-if="authStore.isLogin" class="col-12 link text-white py-3 border-bottom border-secondary text-center" to="/stamp"><h3><i class="bi bi-postage-heart-fill"></i></h3></RouterLink>
            <RouterLink v-if="authStore.isLogin" class="col-12 link text-white py-3 border-bottom border-secondary text-center" to="/envelope"><h3><i class="bi bi-envelope-fill"></i></h3></RouterLink>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-11 bg-white mt-5">
          <RouterView></RouterView>
        </div>
      </div>
      <GoTop />
    </div>


</template>

<style scoped>
a {
  /* color: black !important; */
  text-decoration: none;
  transition: 0.3s;
}

a:hover {
  /* color: white !important; */
  background: rgb(138, 138, 138) !important;
  transition: 0.3s;
}

li {
  list-style-type: none;
}

.link {
  /* border-radius: 3px; */
}

#container {
  border-radius: 10px;
  background-color: lightgray
}

.sticky-top {
  margin-top: 300px !important;
  top: 40px !important;
  transition: 0.3s;
}

.h-100 {
  height: 100vh !important;
}
</style>
