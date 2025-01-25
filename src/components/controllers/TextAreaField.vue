<template>
    <div class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <div class="input-container" style="position:relative;">
                <textarea :id="id" :rows="state.rows" :value="defaultValue" class="form-control" :maxlength="state.maxlength" :placeholder="state.placeholder">
                </textarea>
                <span class="input-border"></span>
            </div>
        </div>
        <div class="col-12 validation-error-message" v-show="!state.isValid">
            <span>{{ state.validation }}</span>
        </div>
    </div>
</template>
<script setup> 
import { ref, reactive, onMounted, onUnmounted } from 'vue';

var props = defineProps({
    id : readVal(String, GUID(), true),
    exportAs: readVal(String, ""),
    label: readVal(String, ""),
    rows: readVal(Number, 3.5),
    hasLabel: readBool(Boolean, true),
    defaultValue : readVal([String, Number], ""),
    maxlength: readVal(Number, 999),
    placeholder : readVal(String, ""),
    validation: readVal(String, "This field is required"),
    isValid: readBool(Boolean, true)
});
var state = reactive({ ...props });
var labelVisibility = !state.hasLabel ? "visibility: hidden;" : "";
var thisVal = ref(null);

var plainProps = reduceProps(props, state);
var functionDefinitions = {
    setLabel: (label) => {
        if (isEmpty(label)) return "";
        state.label = label;
    },
    setPlaceholder: (text) => {
        state.placeholder = text;
    },
    getDefaultValue: () => {
        return state.defaultValue || "";
    },
    setRows: (rows) => {
        if(typeof rows != "number") return state.rows;
        return state.rows = rows
    },
    val: (str) => {
        if (!thisVal.value) return state.defaultValue;
        if (!isEmptyOrNull(str)) {
            thisVal.value.value = str;
            state.defaultValue = str; 
        }
        return thisVal.value.value || state.defaultValue;
    }
};
var functions = reduceFunctions(functionDefinitions);
onMounted(() => {
    thisVal.value = document.getElementById(state.id);
    registerField(props.id, { ...plainProps , ...functions});
});
onUnmounted(() => {
    unregisterField(props.id);
});
</script>