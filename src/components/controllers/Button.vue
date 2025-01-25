<template>
    <a :id="id" href="javascript:void(0)" :onclick="onclick" class="form-button" :class="_class">
        {{ state.text }}
    </a>
</template>
<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
var props = defineProps({
    id: readVal(String, GUID(), true),
    text: readVal(String, ""),
    onclick: getFunction(),
    color: readVal(String, ""),
    _class: readVal(String, "")
})
var state = reactive({ ...props });
</script>