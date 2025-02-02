<template>
    <a :id="id" href="javascript:void(0)" :onclick="onclick" class="form-button" :class="_class">
        <fa v-if="btnIcon.length" :icon="btnIcon" />
        {{ state.text }}
    </a>
</template>
<script setup>
import { reactive, onMounted, onUnmounted, computed } from 'vue';
var props = defineProps({
    id: readVal(GUID(), true),
    text: readVal(""),
    onclick: getFunction(),
    color: readVal(""),
    _class: readVal(""),
    icon: readVal("")
})
var state = reactive({ ...props });
var btnIcon = getIcon(state.icon);
</script>