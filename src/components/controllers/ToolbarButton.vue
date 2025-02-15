<template>
    <component :is="fieldTag">
        <a v-show="showInput" :id="id" href="javascript:void(0)" :onclick="onclick" class="form-button" :class="_class" :style="{ 'background-color': color }">
            <fa class="icon" v-if="btnIcon.length" :icon="btnIcon" />
            {{ state.text }}
        </a>
    </component>
</template>
<script setup>
import { reactive, onMounted, onUnmounted, computed } from 'vue';
var props = defineProps({
    id: readVal(GUID(), true),
    text: readVal(""),
    onclick: getFunction(),
    color: readVal("#42b983"),
    _class: readVal(""),
    icon: readVal(""),
    fieldTag: readVal("ToolbarButton"),
    visibility: readVal("false")
})
var state = reactive({ ...props });
var plainProps = reduceProps(props, state);
var btnIcon = computed(() => { return getIcon(state.icon); });
var builderId = {};
var showInput = computed(() => { return state.visibility });

var updateFieldRegistration = () => {
    var plainProps = reduceProps(props, state);
    registerField(props.id, { ...plainProps, ...functions });
    getBuilderFields(builderId, [props.id]);
};

var updateState = (key, value) => {
    state[key] = value;
    updateFieldRegistration();
};
var functionDefinitions = {
    setText: (str) => {
        if (isEmpty(str)) return "";
        updateState('text', str);
    },
    setIcon: (icon) => {
        if (isEmpty(icon)) return "";
        updateState('icon', icon);
    },
    removeIcon: () => {
        updateState('icon', "");
    }
}
var functions = reduceFunctions(functionDefinitions);

onMounted(() => {
    builderId = getBuilderId();
    registerField(props.id, { ...plainProps , ...functions});
});
onUnmounted(() => {
    unregisterField(builderId, props.id);
});
</script>