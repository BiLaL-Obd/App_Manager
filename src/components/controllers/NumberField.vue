<template>
    <TextField type="number" :id="id" :label="label" :value="defaultValue" :max="max" :min="min" :hasLabel="hasLabel" :placeholder="placeholder" :validation="validation" :isValid="isValid" />
</template>
<script setup>
import TextField from '../controllers/TextField.vue'
    var props = defineProps({
        id : readVal(String, GUID(), true),
        exportAs: readVal(String, ""),
        label: readVal(String, ""),
        hasLabel: readBool(Boolean, true),
        defaultValue : readVal([String, Number], ""),
        max: readVal(Number, 999999999999999),
        min: readVal(Number, 0),    
        placeholder : readVal(String, ""),
        validation: readVal(String, "This field is required"),
        isValid: readBool(Boolean, false)
    });
</script>