<script setup>
defineProps({
  title: String,
  content: String,
  price: Number
})

defineEmits(['select'])
</script>

<template>
  <div class="drink-card" @click="$emit('select')">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <strong>NT$ {{ price }}</strong>
    <button>選擇飲料</button>
  </div>
</template>

<style scoped>
.drink-card {
  padding: 18px;
  background: white;
  border: 2px solid #dce9df;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
}

.drink-card:hover {
  border-color: #4c956c;
  transform: translateY(-3px);
}

h3 {
  color: #376b4b;
}

p {
  color: #666;
}

strong {
  display: block;
  color: #d65a31;
  margin: 12px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #4c956c;
  color: white;
  cursor: pointer;
}
</style>