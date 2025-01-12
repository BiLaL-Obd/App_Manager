<template>
    <div class="row form-group">
        <label class="form-label" :style="labelVisibility">{{ state.label }}</label>
        <div class="col-12">
            <input :id="id" :type="type" :value="defaultValue" class="form-control" :class="{ mendatory: isValid }" :maxlength="state.maxlength" :max="state.max" :min="state.min" :placeholder="state.placeholder" :required="state.required">
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
        val: (str) => {
            if(!isEmptyOrNull(str))
                return document.getElementById(state.id).value = str;
            return document.getElementById(state.id).value || "";
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