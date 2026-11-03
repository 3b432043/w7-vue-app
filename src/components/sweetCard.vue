<script setup>
defineProps({
  title: String,
  content: Array,
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="selector-card">
    <h3>{{ title }}</h3>

    <button
      v-for="item in content"
      :key="item"
      :class="{ active: modelValue === item }"
      @click="$emit('update:modelValue', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<style scoped>
.selector-card {
  margin: 15px 0;
  padding: 15px;
  background: #fff9ef;
  border-radius: 10px;
}

h3 {
  color: #376b4b;
}

button {
  margin: 5px;
  padding: 9px 15px;
  border: 1px solid #4c956c;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

button.active {
  background: #4c956c;
  color: white;
}
</style>