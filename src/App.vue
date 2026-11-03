
<script setup>
import { ref, computed } from 'vue'

import DrinkCard from './components/drinkCard.vue'
import SweetCard from './components/sweetCard.vue'
import IceCard from './components/icecard.vue'

// 15 種飲料
const drinks = [
  // 原茶系列
  { id: 1, title: '紅茶', content: '香醇順口', price: 30, category: '原茶系列' },
  { id: 2, title: '綠茶', content: '清新回甘', price: 30, category: '原茶系列' },
  { id: 3, title: '青茶', content: '清香甘甜', price: 35, category: '原茶系列' },
  { id: 4, title: '烏龍茶', content: '茶香濃厚', price: 35, category: '原茶系列' },

  // 奶茶系列
  { id: 5, title: '珍珠奶茶', content: '奶香濃郁，搭配 Q 彈珍珠', price: 55, category: '奶茶系列' },
  { id: 6, title: '奶綠', content: '清香綠茶搭配香醇奶味', price: 50, category: '奶茶系列' },
  { id: 7, title: '烏龍奶茶', content: '濃厚茶香與奶香融合', price: 55, category: '奶茶系列' },
  { id: 8, title: '布丁奶茶', content: '滑嫩布丁搭配奶茶', price: 60, category: '奶茶系列' },

  // 鮮奶茶系列
  { id: 9, title: '紅茶拿鐵', content: '香醇紅茶搭配鮮奶', price: 60, category: '鮮奶茶系列' },
  { id: 10, title: '抹茶拿鐵', content: '濃郁抹茶與鮮奶', price: 65, category: '鮮奶茶系列' },
  { id: 11, title: '黑糖珍珠鮮奶', content: '香甜黑糖搭配珍珠與鮮奶', price: 70, category: '鮮奶茶系列' },

  // 水果茶系列
  { id: 12, title: '百香綠茶', content: '酸甜百香果搭配綠茶', price: 50, category: '水果茶系列' },
  { id: 13, title: '檸檬紅茶', content: '清爽檸檬與紅茶', price: 50, category: '水果茶系列' },
  { id: 14, title: '蜂蜜檸檬', content: '蜂蜜香甜與檸檬清爽', price: 55, category: '水果茶系列' },

  // 特色飲品
  { id: 15, title: '冬瓜茶', content: '古早味冬瓜清甜滋味', price: 35, category: '特色飲品' }
]

// 甜度與冰塊選項
const sweetnessOptions = ['全糖', '半糖', '微糖', '無糖']
const iceOptions = ['正常冰', '少冰', '去冰']

// 點餐資料
const selectedDrink = ref(null)
const selectedSweetness = ref('半糖')
const selectedIce = ref('正常冰')
const quantity = ref(1)
const cart = ref([])

// 選擇飲料
function chooseDrink(drink) {
  selectedDrink.value = drink
  selectedSweetness.value = '半糖'
  selectedIce.value = '正常冰'
  quantity.value = 1
}

// 加入購物車
function addToCart() {
  if (!selectedDrink.value) return

  if (!Number.isInteger(quantity.value) || quantity.value < 1) {
    alert('請輸入正確的飲料數量')
    return
  }

  cart.value.push({
    id: Date.now() + Math.random(),
    title: selectedDrink.value.title,
    price: selectedDrink.value.price,
    sweetness: selectedSweetness.value,
    ice: selectedIce.value,
    quantity: quantity.value
  })

  selectedDrink.value = null
}

// 刪除購物車商品
function removeFromCart(id) {
  cart.value = cart.value.filter(item => item.id !== id)
}

// 計算總金額
const total = computed(() => {
  return cart.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
})

// 依照系列分類
const categories = [
  '原茶系列',
  '奶茶系列',
  '鮮奶茶系列',
  '水果茶系列',
  '特色飲品'
]
</script>

<template>
  <main class="container">

    <!-- 店家標題 -->
    <header class="header">
      <h1>🧋 幸福茶飲店</h1>
      <p class="subtitle">新鮮茶飲・現點現做</p>
      <p class="welcome">歡迎使用線上點餐系統</p>
    </header>

    <!-- 飲料選單 -->
    <section class="menu-section">
      <h2>第一步：選擇飲料</h2>

      <div
        v-for="category in categories"
        :key="category"
        class="category-section"
      >
        <h3 class="category-title">{{ category }}</h3>

        <div class="drink-list">
          <DrinkCard
            v-for="drink in drinks.filter(item => item.category === category)"
            :key="drink.id"
            :title="drink.title"
            :content="drink.content"
            :price="drink.price"
            @select="chooseDrink(drink)"
          />
        </div>
      </div>
    </section>

    <!-- 飲料設定 -->
    <section v-if="selectedDrink" class="order-panel">
      <h2>第二步：設定你的飲料</h2>

      <h3 class="selected-title">
        {{ selectedDrink.title }}
        <span>NT$ {{ selectedDrink.price }}</span>
      </h3>

      <SweetCard
        title="請選擇甜度"
        :content="sweetnessOptions"
        v-model="selectedSweetness"
      />

      <IceCard
        title="請選擇冰塊"
        :content="iceOptions"
        v-model="selectedIce"
      />

      <div class="quantity-area">
        <label for="quantity">選擇數量：</label>
        <input
          id="quantity"
          v-model.number="quantity"
          type="number"
          min="1"
          step="1"
        />
      </div>

      <p class="subtotal">
        小計：NT$ {{ selectedDrink.price * quantity }}
      </p>

      <div class="action-buttons">
        <button
          class="primary"
          :disabled="!Number.isInteger(quantity) || quantity < 1"
          @click="addToCart"
        >
          加入購物車
        </button>

        <button
          class="cancel"
          @click="selectedDrink = null"
        >
          取消選擇
        </button>
      </div>
    </section>

    <!-- 購物車 -->
    <section class="cart">
      <h2>🛒 購物車</h2>

      <p v-if="cart.length === 0" class="empty-cart">
        目前還沒有選購飲料，快去選擇喜歡的飲料吧！
      </p>

      <div
        v-for="item in cart"
        :key="item.id"
        class="cart-item"
      >
        <div class="cart-info">
          <strong>{{ item.title }}</strong>
          <p>甜度：{{ item.sweetness }}</p>
          <p>冰塊：{{ item.ice }}</p>
          <p>數量：{{ item.quantity }}</p>
          <p class="item-price">
            小計：NT$ {{ item.price * item.quantity }}
          </p>
        </div>

        <button
          class="delete-button"
          @click="removeFromCart(item.id)"
        >
          刪除
        </button>
      </div>

      <div class="total-area">
        總金額：NT$ {{ total }}
      </div>
    </section>

    <footer>
      © 2026 幸福茶飲店｜新鮮茶飲・現點現做
    </footer>

  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: #f7f3ed;
  font-family: "Microsoft JhengHei", sans-serif;
  color: #333;
}

#app {
  width: 100%;
  max-width: none;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1100px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 35px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  text-align: center;
  margin-bottom: 35px;
}

h1 {
  color: #376b4b;
  font-size: 36px;
  margin: 0 0 10px;
}

.subtitle {
  color: #666;
  font-size: 17px;
  margin: 5px;
}

.welcome {
  color: #888;
  font-size: 14px;
}

.menu-section {
  width: 100%;
  text-align: center;
}

h2 {
  color: #376b4b;
  font-size: 23px;
  text-align: center;
  margin: 20px 0;
}

.category-section {
  width: 100%;
  margin-bottom: 30px;
}

.category-title {
  color: #4c956c;
  text-align: center;
  font-size: 19px;
  margin: 20px 0 15px;
}

.drink-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  justify-content: center;
  align-items: stretch;
}

.order-panel,
.cart {
  width: 100%;
  max-width: 850px;
  margin: 30px auto 0;
  padding: 25px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.selected-title {
  color: #376b4b;
}

.selected-title span {
  color: #d65a31;
  margin-left: 10px;
}

.quantity-area {
  margin: 20px;
}

.quantity-area input {
  width: 85px;
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 7px;
}

.subtotal {
  color: #d65a31;
  font-size: 20px;
  font-weight: bold;
}

.action-buttons {
  text-align: center;
  margin-top: 15px;
}

.primary,
.cancel,
.delete-button {
  padding: 11px 18px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 15px;
}

.primary {
  background: #4c956c;
  margin-right: 10px;
}

.primary:hover {
  background: #34704d;
}

.primary:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.cancel,
.delete-button {
  background: #e76f51;
}

.empty-cart {
  color: #888;
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  gap: 15px;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.cart-info strong {
  color: #376b4b;
  font-size: 18px;
}

.cart-info p {
  margin: 6px 0;
}

.item-price {
  color: #d65a31;
  font-weight: bold;
}

.total-area {
  text-align: center;
  color: #d65a31;
  font-size: 24px;
  font-weight: bold;
  margin-top: 22px;
}

footer {
  width: 100%;
  text-align: center;
  color: #999;
  font-size: 13px;
  margin-top: 35px;
  padding: 15px;
}

@media (max-width: 700px) {
  .drink-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .container {
    padding: 20px 14px;
  }

  h1 {
    font-size: 28px;
  }

  .drink-list {
    grid-template-columns: 1fr;
  }

  .order-panel,
  .cart {
    padding: 17px;
  }

  .cart-item {
    align-items: flex-start;
  }
}
</style>
