<template>
    <div class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <textarea :id="id" :rows="state.rows" :value="defaultValue" class="form-control" :maxlength="state.maxlength" :placeholder="state.placeholder">
            </textarea>
        </div>
        <div class="col-12 validation-error-message" v-if="isValid">
            <span>{{ state.validation }}</span>
        </div>
    </div>
</template>
<script setup> 
import { reactive, onMounted, onUnmounted } from 'vue';

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
        isValid: readBool(Boolean, false)
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
        setPlaceholder: (text) => {
            state.placeholder = text;
        },
        getDefaultValue: () => {
            return state.defaultValue || "";
        },
        setRows: (rows) => {
            if(typeof rows != "number") return state.rows;
            return state.rows = rows
        }
    };
    var functions = reduceFunctions(functionDefinitions);
    onMounted(() => {
        registerField(props.id, { ...plainProps , ...functions});
    });
    onUnmounted(() => {
        unregisterField(props.id);
    });
</script>