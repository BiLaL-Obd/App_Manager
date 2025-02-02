<template>
    <TextField type="number" :id="id" :label="label" :value="defaultValue" :max="max" :min="min" :hasStar="hasStar"
    :hasLabel="hasLabel" :placeholder="placeholder" :validation="validation" :isValid="isValid"/>
</template>
<script setup>
import TextField from '../controllers/TextField.vue'
import { reactive, onMounted, onUnmounted } from 'vue';

var props = defineProps({
    id : readVal(GUID(), true),
    exportAs: readVal(""),
    label: readVal(""),
    hasLabel: readBool(true),
    defaultValue : readVal("", false, [String, Number]),
    max: readVal("999999999999999"),
    min: readVal("0"),    
    maxlength: readVal("999"),
    placeholder : readVal(""),
    validation: readVal("This field is required"),
    isValid: readBool(true),
    hasStar: readBool(false),
});
var state = reactive({ ...props });
var plainProps = reduceProps(props, state);
var builderId = {};

var functionDefinitions = {
    ...reduceFunctions({
        val: (nbr) => {
            nbr = +nbr;
            if(!isNumber(nbr)) throw "this must be contain number";
            var value = parseFloat(nbr);
            window[builderId][state.id] = Math.max(state.min, Math.min(state.max, value))
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
    builderId = getBuilderId();
    registerField(props.id, { ...plainProps, ...functions });
    var bindingKey = document.getElementById(props.id);
    bindingKey.addEventListener('input', () => {
        var value = parseInt((bindingKey.value || 0));
        var min = parseInt(props.min);
        var max = parseInt(props.max);

        window[builderId][state.id] = Math.max(min, Math.min(max, value));
    });
});

onUnmounted(() => {
    unregisterField(props.id);
});
</script>