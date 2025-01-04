<template>
    <TextField type="number" v-bind="state" />
</template>
<script setup>
import { reactive} from 'vue';
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
    });
var state = reactive({ ...props });
</script>