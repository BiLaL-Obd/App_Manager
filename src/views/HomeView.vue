<template>
  <Builder id="testing">
        <TextField id="test" :hasLabel="false" label="Testing Field" hasStar validation="this is required" :isValid="isValid.test"/>
        <NumberField id="test2" label="Testing Field 2" max="2" hasStar validation="this is required" :isValid="isValid.test2"/>
        <TextAreaField id="test3" label="Testing Field 2"/>

        <Button id="test4" text="click" :onclick="validateAllFields" />
  </Builder>
</template>
<script setup>
import Builder from '../components/controllers/manager/Builder.vue';
import { TextField, NumberField, TextAreaField, Button } from '../components/controllers';
import { reactive } from 'vue';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
