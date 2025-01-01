<template>
    <div class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <input :id="id" :type="type" :value="defaultValue" class="form-control" :maxlength="state.maxlength" :max="state.max" :min="state.min" :placeholder="state.placeholder">
        </div>
    </div>
</template>
<script setup> 
import { reactive, onMounted, onUnmounted, toRefs, computed  } from 'vue';

    var props = defineProps({
        id : readVal(String, GUID(), true),
        exportAs: readVal(String, ""),
        type: readVal(String, "text"),
        label: readVal(String, ""),
        hasLabel: readBool(Boolean, true),
        defaultValue : readVal([String, Number], ""),
        max: readVal(Number, 999999999999999),
        min: readVal(Number, 0),
        maxlength: readVal(Number, 999),
        placeholder : readVal(String, ""),
    });
    var state = reactive({ ...props });
    var labelVisibility = !state.hasLabel ? "visibility: hidden;" : "";
    var defaultValue = !isEmpty(state.defaultValue)? state.defaultValue : "";

    var plainProps = reduceProps(props, state);
    var functionDefinitions = {
        setLabel: (label) => {
            if (isEmpty(label)) return "";
            state.label = label;
        },
        setMax: (value) => {
            if (value >= state.min) state.max = value;
        },
        setMin: (value) => {
            if (value <= state.max) state.min = value;
        },
        setPlaceholder: (text) => {
            state.placeholder = text;
        },
        getDefaultValue: () => {
            return state.defaultValue || "";
        },
    };
    var functions = reduceFunctions(functionDefinitions);

    onMounted(() => {
        registerField(props.id, { ...plainProps , ...functions});
    });
    onUnmounted(() => {
        unregisterField(props.id);
    });
</script>