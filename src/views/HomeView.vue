<script setup>
import Builder from '../components/controllers/manager/Builder.vue'
import TextField from '../components/controllers/TextField.vue'
</script>

<template>
  <Builder id="testing">
        <TextField id="test" :hasLabel="false" label="Testing Field"/>
        <TextField id="test2" label="Testing Field 2"/>
  </Builder>
</template>
