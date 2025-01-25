<template>
    <div class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <div class="input-container" style="position:relative;">
                <input :id="id" :type="type" v-model="inputValue" autocomplete="off" class="form-control" :class="{ 'mendatory': (state.hasStar || state.required), 'mendatory-not-valid': !state.isValid }" :maxlength="state.maxlength" :max="state.max" :min="state.min" :placeholder="state.placeholder" :required="state.required">
                <span class="input-border" v-show="state.isValid"></span>
            </div>
        </div>
        <div class="col-12 validation-error-message" v-show="!state.isValid">
            <span>{{ state.validation }}</span>
        </div>
    </div>
</template>
<script setup> 
import { reactive, onMounted, onUnmounted, watch, computed } from 'vue';

var props = defineProps({
    id : readVal(String, GUID(), true),
    exportAs: readVal(String, ""),
    type: readVal(String, "text"),
    label: readVal(String, ""),
    hasLabel: readBool(Boolean, true),
    defaultValue : readVal([String, Number], ""),
    max: readVal(String, "999999999999999"),
    min: readVal(String, "0"),
    maxlength: readVal(String, "999"),
    placeholder : readVal(String, ""),
    required: readBool(Boolean, false),
    validation: readVal(String, "This field is required"),
    isValid: readBool(Boolean, true),
    hasStar: readBool(Boolean, false),
});
var state = reactive({ ...props });
var labelVisibility = !state.hasLabel ? "visibility: hidden;" : "";
var builderId = {};
// var checkInterval = null; 

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
    val: (str) => {
        if (!isEmptyOrNull(str))
            inputValue.value = str;
        return state.defaultValue;
    },
    showStar: () => {
        updateState('hasStar', true);
    },
    hideStar: () => {
        updateState('hasStar', false);
    }
};
var functions = reduceFunctions(functionDefinitions);

var updateFieldRegistration = () => {
    if(!isEmptyOrNull(state.defaultValue))
        state.isValid = true;
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
    // updateFieldRegistration();
});

watch(state, () => {
    updateFieldRegistration();
}, { deep: true });

var checkWindowValue = () => {
    var windowValue = window[builderId][state.id];
    if (windowValue !== state.defaultValue)
        inputValue.value = windowValue;
};

onMounted(() => {
    builderId = getBuilderId();
    updateWindowValue(builderId, state.id, state.defaultValue, checkWindowValue);
    registerField(props.id, { ...plainProps , ...functions});
    // checkInterval = setInterval(checkWindowValue, 100);
});
onUnmounted(() => {
    // clearInterval(checkInterval); 
    unregisterField(builderId, props.id);
});
</script>