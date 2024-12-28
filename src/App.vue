<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
import ThrowError from './components/controllers/ThrowError.vue';
var errorMessage = ref(null);

  var checkDuplicateIds = () => {
      var existingBuilders = document.querySelectorAll('body builder');
      if (existingBuilders.length > 1) 
        errorMessage.value = "Only one Builder component can be added to the page.<br>Please remove the another one.";

      if(existingBuilders.length < 0)
        errorMessage.value = "The page should be contain a Builder with id.<br>Please add one.";
  };
setTimeout(() => {
  checkDuplicateIds();
}, 555);
</script>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>

  <RouterView />
  <ThrowError :error="errorMessage"/>
</template>