<template>
    <component :is="fieldTag" class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <div class="input-container" style="position:relative;">
                <input :id="id" type="number" v-model="inputValue" autocomplete="off" class="form-control" :class="{ 'mendatory': (state.hasStar || state.required), 'mendatory-not-valid': !state.isValid }" 
                :max="state.max" :min="state.min" :placeholder="state.placeholder" :required="state.required">
                <span class="input-border" v-show="state.isValid"></span>
            </div>
        </div>
        <div class="col-12 validation-error-message" v-show="!state.isValid">
            <span>{{ state.validation }}</span>
        </div>
    </component>
</template>
<script setup>
import { reactive, onMounted, onUnmounted, watch, computed } from 'vue';

var props = defineProps({
    id : readVal(GUID(), true),
    exportAs: readVal(""),
    label: readVal(""),
    hasLabel: readBool(true),
    defaultValue : readVal("", false, [String, Number]),
    max: readVal("999999999999999"),
    min: readVal("0"),    
    placeholder : readVal(""),
    validation: readVal("This field is required"),
    isValid: readBool(true),
    hasStar: readBool(false),
    fieldTag: readVal("NumberField"),
});
var state = reactive({ ...props });
var labelVisibility = !state.hasLabel ? "visibility: hidden;" : "";
var builderId = {};
var plainProps = reduceProps(props, state);
var updateState = (key, value) => {
    state[key] = value;
    updateFieldRegistration();
};

var functionDefinitions = {
    setLabel: (label) => {
        if (isEmpty(label)) return "";
        updateState('label', label);
    },
    setMax: (value) => {
        if (value >= state.min) updateState('max', value);
    },
    setMin: (value) => {
        if (value <= state.max) updateState('min', value);
    },
    setPlaceholder: (text) => {
        updateState('placeholder', text);
    },
    getDefaultValue: () => {
        return state.defaultValue || "";
    },
    val: (nbr) => {
        nbr = +nbr;
        if(!isNumber(nbr)) throw "this must be contain number";
        var value = parseFloat(nbr);
        window[builderId][state.id] = Math.max(state.min, Math.min(state.max, value))
    },
};
var updateFieldRegistration = () => {
    if(!isEmptyOrNull(state.defaultValue))
        state.isValid = true;
   if (state.defaultValue !== window[builderId][state.id]) {
        state.defaultValue = window[builderId][state.id]; 
    }
    var plainProps = reduceProps(props, state);
    registerField(props.id, { ...plainProps, ...functions });
    getBuilderFields(builderId, [props.id]);
};
var inputValue = computed({
    get: () => state.defaultValue,
    set: (value) => {
        state.defaultValue = value;
        window[builderId][state.id] = value;
        updateFieldRegistration();
    }
});

watch(props, (newProps) => {
    Object.assign(state, newProps);
});

watch(state, () => {
    updateFieldRegistration();
}, { deep: true });

var functions = reduceFunctions(functionDefinitions);
var checkWindowValue = () => {
    var windowValue = window[builderId][state.id];
    if (windowValue !== state.defaultValue)
        inputValue.value = windowValue;
};
onMounted(() => {
    builderId = getBuilderId();
    updateWindowValue(builderId, state.id, state.defaultValue, checkWindowValue);
    registerField(props.id, { ...plainProps, ...functions });
    var bindingKey = document.getElementById(props.id);
    bindingKey.addEventListener('input', () => {
        var value = parseInt((bindingKey.value || 0));
        var min = parseInt(state.min);
        var max = parseInt(state.max);
        window[builderId][state.id] = Math.max(min, Math.min(max, value));
    });
});

onUnmounted(() => {
    unregisterField(builderId, props.id);
});
</script>