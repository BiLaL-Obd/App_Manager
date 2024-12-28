<template>
    <div class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <input :id="id" :type="type" :value="defaultValue" class="form-control" :maxlength="state.maxlength" :max="state.max" :min="state.min" :placeholder="state.placeholder">
        </div>
    </div>
</template>
<script setup> 
import { reactive, onMounted, onUnmounted } from 'vue';

    var props = defineProps({
        id : {type: String, required: true, default: GUID()},
        type: {type: String, default: 'text'},
        label: {type: String},
        hasLabel: {type: Boolean, default: true},
        defaultValue : {type: [String, Number]},
        max: {type: Number, default: 999999999999999},
        min: {type: Number, default: 0},
        maxlength: {type: Number, default: 999},
        placeholder : {type: String, default: '' },
    });
    var state = reactive({ ...props });
    var labelVisibility = !state.hasLabel ? "visibility: hidden;" : "";
    var defaultValue = !isEmptyOrNull(state.defaultValue)? state.defaultValue : "";

    var functions = {
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

    onMounted(() => {
        registerField(props.id, {...functions});
    });
    onUnmounted(() => {
        unregisterField(props.id);
    });
</script>