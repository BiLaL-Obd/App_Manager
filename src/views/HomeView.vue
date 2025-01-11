<template>
  <Builder id="testing">
        <TextField id="test" :hasLabel="false" label="Testing Field" validation="this is required" :isValid="isValid.test"/>
        <NumberField id="test2" label="Testing Field 2" max="2" validation="this is required" :isValid="isValid.test2"/>
        <TextAreaField id="test3" label="Testing Field 2"/>
  </Builder>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import Builder from '../components/controllers/manager/Builder.vue';
import { TextField, NumberField, TextAreaField } from '../components/controllers';

var isValid = reactive({
  test: false,
  test2: false,
  test3: false,
});
var fieldIds = ['test', 'test2', 'test3'];
var validateField = (key) => {
  if (!window.Fields || !window.Fields.testing || !window.Fields.testing[key]) {
    console.warn(`Field ${key} not found in window.Fields`);
    return;
  }
  if(!isEmptyOrNull(Fields.testing[key].val))
    isValid[key] = !isEmpty(window.Fields.testing[key].val());
};
var validateAllFields = () => {
  fieldIds.forEach((id) => validateField(id));
};

onMounted(() => {
  validateAllFields();
});
</script>
