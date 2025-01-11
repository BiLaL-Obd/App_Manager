<template>
    <component :is="builderTag" :id="id">
        <div class="container">
            <slot></slot>
        </div>
    </component>
</template>
<script setup>
import { onMounted } from 'vue';

var props = defineProps({
    id: readVal(String, "", true)
});

var builderTag = 'Builder';

var checkDuplicateIds = () => {
    if(isEmpty(props.id))
    {
        Throw.Show(`Please this Builder should be have an ID`);
        return;
    }
    var slotChildren = document.querySelectorAll(`builder [id]`);
    var ids = Array.from(slotChildren).map((el) => el.id);

    var duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
        Throw.Show(`Duplicate id found in Builder Id: ${duplicateIds.join(', ')}`);
        return;
    }
    getBuilderFields(props.id, ids)
};
onMounted(() => {
    checkDuplicateIds();
});
</script>