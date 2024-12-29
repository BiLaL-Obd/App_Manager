<template>
    <component :is="builderTag" :id="id">
        <div class="container">
            <slot></slot>
        </div>
        <ThrowError :error="errorMessage"/>
    </component>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import ThrowError from '../../controllers/ThrowError.vue';

var props = defineProps({
    id: { type: String, required: true }
});

var builderTag = 'Builder';
var errorMessage = ref(null);

var checkDuplicateIds = () => {
    if(isEmptyOrNull(props.id))
    {
        errorMessage.value = `Please this Builder should be have an ID`;
        return;
    }
    var slotChildren = document.querySelectorAll(`builder [id]`);
    var ids = Array.from(slotChildren).map((el) => el.id);

    var duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
        errorMessage.value = `Duplicate id found in Builder Id: ${duplicateIds.join(', ')}`;
        return;
    }
    getBuilderFields(props.id, ids)
};
onMounted(() => {
    checkDuplicateIds();
});
</script>