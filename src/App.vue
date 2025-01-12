<script setup>
import { RouterLink, RouterView } from 'vue-router';
var checkDuplicateIds = () => {
    var existingBuilders = document.querySelectorAll('body builder');
    if (existingBuilders.length > 1) 
      Throw.error("Only one Builder component can be added to the page.<br>Please remove the another one.");

    if(existingBuilders.length < 0)
      Throw.error("The page should be contain a Builder with id.<br>Please add one.");
};

setTimeout(() => { checkDuplicateIds(); }, 555);
</script>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>

  <RouterView />
</template>