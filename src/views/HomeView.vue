<template>
  <Builder id="testing">
        <TextField id="test" :hasLabel="false" label="Testing Field" hasStar validation="this is required" :isValid="isValid.test"/>
        <NumberField id="test2" label="Testing Field 2" max="2" validation="this is required" :isValid="isValid.test2"/>
        <TextAreaField id="test3" label="Testing Field 2"/>
        <Button text="click" :onclick="validateAllFields" />
  </Builder>
</template>
<script setup>
import { reactive } from 'vue';
import Builder from '../components/controllers/manager/Builder.vue';
import { TextField, NumberField, TextAreaField, Button } from '../components/controllers';

var fieldIds = ['test', 'test2'];
var isValid = reactive({});

var validateField = (key) => {
  isValid[key] = true;
  var field = Fields.testing[key];
  if (!field) {
    Throw.error(`Field ${key} not found in Fields`);
    return;
  }
  isValid[key] = isEmptyOrNull(field) ? true : !isEmpty(field.val());
};
var validateAllFields = () => {
  fieldIds.forEach((id) => validateField(id))
};
</script>
