<template>
  <Builder id="testing">
        <TextField id="test" :hasLabel="false" label="Testing Field" validation="this is required" :isValid="isValid.test"/>
        <NumberField id="test2" label="Testing Field 2" validation="this is required" :isValid="isValid.test2"/>
        <TextAreaField id="test3" label="Testing Field 2"/>
  </Builder>
</template>
<script setup>
import Builder from '../components/controllers/manager/Builder.vue'
import TextField from '../components/controllers/TextField.vue'
import NumberField from '../components/controllers/NumberField.vue'
import TextAreaField from '../components/controllers/TextAreaField.vue'
import { reactive, onMounted } from 'vue';
// Reactive object to track validation status
const isValid = reactive({
  test: false,
  test2: false,
  test3: false,
});
const fieldIds = ['test', 'test2', 'test3'];

// Validate a specific field
const validateField = (key) => {
  if (!window.Fields || !window.Fields.testing || !window.Fields.testing[key]) {
    console.warn(`Field ${key} not found in window.Fields`);
    return;
  }
  if(!isEmptyOrNull(Fields.testing[key].val))
    isValid[key] = !isEmpty(window.Fields.testing[key].val());
};

// Validate all fields dynamically
const validateAllFields = () => {
  fieldIds.forEach((id) => validateField(id));
};

// Validate fields on component mount
onMounted(() => {
  validateAllFields();
});
</script>
