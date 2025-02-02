<template>
    <div class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <div class="input-container" style="position:relative;">
                <textarea :id="id" :rows="state.rows" v-model="inputValue" class="form-control" :class="{ 'mendatory': (state.hasStar || state.required), 'mendatory-not-valid': !state.isValid }" 
                 :maxlength="state.maxlength" :placeholder="state.placeholder">
                </textarea>
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
    id : readVal(GUID(), true),
    exportAs: readVal(""),
    label: readVal(""),
    rows: readVal(3.5, false, Number),
    hasLabel: readBool(true),
    defaultValue : readVal("", false, [String, Number]),
    maxlength: readVal("999"),
    placeholder : readVal(""),
    required: readBool(false),
    validation: readVal("This field is required"),
    isValid: readBool(true),
    hasStar: readBool(false),
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
    setPlaceholder: (text) => {
        updateState('placeholder', text);
    },
    getDefaultValue: () => {
        return state.defaultValue || "";
    },
    setRows: (rows) => {
        if(typeof rows != "number") return state.rows;
        return state.rows = rows
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
    state.defaultValue = window[builderId][state.id];
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

var checkWindowValue = () => {
    var windowValue = window[builderId][state.id];
    if (windowValue !== state.defaultValue)
        inputValue.value = windowValue;
};

onMounted(() => {
    builderId = getBuilderId();
    updateWindowValue(builderId, state.id, state.defaultValue, checkWindowValue);
    registerField(props.id, { ...plainProps , ...functions});
});
onUnmounted(() => {
    unregisterField(builderId, props.id);
});
</script>