<template>
    <TextField type="number" :id="id" :label="label" :value="defaultValue" :max="max" :min="min" :hasLabel="hasLabel" :placeholder="placeholder" :validation="validation" :isValid="isValid"/>
</template>
<script setup>
import TextField from '../controllers/TextField.vue'
import { reactive, onMounted, onUnmounted } from 'vue';

var props = defineProps({
    id : readVal(String, GUID(), true),
    exportAs: readVal(String, ""),
    label: readVal(String, ""),
    hasLabel: readBool(Boolean, true),
    defaultValue : readVal([String, Number], ""),
    max: readVal(String, "999999999999999"),
    min: readVal(String, "0"),    
    maxlength: readVal(String, "999"),
    placeholder : readVal(String, ""),
    validation: readVal(String, "This field is required"),
    isValid: readBool(Boolean, false)
});
var state = reactive({ ...props });
var plainProps = reduceProps(props, state);

var functionDefinitions = {
    ...reduceFunctions({
        val: (str) => {
            if (!isEmptyOrNull(str)) {
                var value = parseFloat(str);
                if (value >= state.min && value <= state.max) {
                    document.getElementById(state.id).value = value;
                }
            }
            return parseFloat(document.getElementById(state.id).value) || "";
        }
    }),
    setMax: (value) => {
        if (value >= state.min) {
            state.max = value;
        }
    },
    setMin: (value) => {
        if (value <= state.max) {
            state.min = value;
        }
    },
};
var functions = reduceFunctions(functionDefinitions);

onMounted(() => {
    registerField(props.id, { ...plainProps, ...functions });
    var bindingKey = document.getElementById(props.id);
    bindingKey.addEventListener('input', () => {
        var value = parseInt((bindingKey.value || 0));
        var min = parseInt(props.min);
        var max = parseInt(props.max);

        bindingKey.value = Math.max(min, Math.min(max, value));
    });
});

onUnmounted(() => {
    unregisterField(props.id);
});
</script>