<template>
  <BuilderManager id="testing">
      <TextInput id="test" :hasLabel="false" label="Testing Field" hasStar validation="this is required" :isValid="isValid.test"/>
      <NumberInput id="test2" label="Testing Field 2" max="2" hasStar validation="this is required" :isValid="isValid.test2"/>
      <TextAreaInput id="test3" label="Testing Field 2"/>
      <ButtonInput icon="fab youtube" id="test4" text="Click" :onclick="validateAllFields" />
  </BuilderManager>
</template>
<script setup>
import { reactive } from 'vue';
var fieldIds = ['test', 'test2'];
var isValid = reactive({});

var validateField = (key) => {
  isValid[key] = true;
  var field = Fields.testing[key];
  if (!field) 
    Throw.error(`Field ${key} not found in Fields`);

  isValid[key] = !isEmpty(testing[key]) && field.hasStar;
};
var validateAllFields = () => {
  fieldIds.forEach((id) => validateField(id))
};
</script>
