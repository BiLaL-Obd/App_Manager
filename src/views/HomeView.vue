<script setup>
import Builder from '../components/controllers/manager/Builder.vue'
import TextField from '../components/controllers/TextField.vue'
import NumberField from '../components/controllers/NumberField.vue'
import TextAreaField from '../components/controllers/TextAreaField.vue'
</script>

<template>
  <Builder id="testing">
        <TextField id="test" :hasLabel="false" label="Testing Field"/>
        <NumberField id="test2" label="Testing Field 2"/>
        <TextAreaField id="test3" label="Testing Field 2"/>
  </Builder>
</template>
