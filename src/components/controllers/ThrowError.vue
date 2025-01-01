<template>
    <div v-if="error" class="error-overlay">
        <div class="container error-container">
            <h4>Error</h4>
            <p v-html="error"></p>
        </div>
    </div>
</template>
<script setup>
    import { ref} from 'vue';
    var props = defineProps({
        error: {type: String}
    });

</script>
<style scoped>
.error-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 20px;
    font-weight: bold;
    z-index: 9999;
    transform: translate(-50%, -50%);
    padding: 20px;
}

.error-overlay .error-container {
    background-color: rgba(206, 17, 38, 0.1);
    color: rgb(252, 207, 207);
    padding: 16px 16px 24px;
    border-radius: 8px;
}
.error-overlay .error-container p {
    margin: 0px;
}
</style>