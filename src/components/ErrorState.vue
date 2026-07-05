<template>
  <view class="error-state">
    <text class="error-title">加载失败</text>
    <text class="error-text">{{ message }}</text>
    <button class="retry-button" type="default" @tap="$emit('retry')">重试</button>
  </view>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "数据暂时无法加载，请稍后重试。",
  },
});

defineEmits(["retry"]);
</script>

<style scoped>
.error-state {
  display: grid;
  gap: 8px;
  min-height: 220px;
  padding: 28px 20px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  text-align: center;
}

.error-title {
  color: var(--text);
  font-size: 15px;
  font-weight: 700;
}

.error-text {
  max-width: 260px;
  color: var(--muted);
  font-size: 13px;
}

.retry-button {
  min-width: 88px;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--primary);
  border-radius: var(--radius);
  background: var(--primary);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
}
</style>
