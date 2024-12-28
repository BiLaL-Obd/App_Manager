<template>
    <div v-if="error" class="error-overlay">
        <div class="container error-container">
            <h4>The Error Message:</h4>
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    color: white;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 20px;
    font-weight: bold;
    z-index: 9999;
}

.error-overlay .error-container {
    background-color: #af25254f;
    padding: 20px;
    border-radius: 8px;
    margin: 40px 0px;
}
.error-overlay .error-container p {
    margin: 0px;
}
</style>