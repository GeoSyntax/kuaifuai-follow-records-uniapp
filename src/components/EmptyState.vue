<template>
  <view class="empty-state">
    <text class="empty-title">暂无跟进记录</text>
    <text class="empty-text">点击右下角按钮添加第一条记录。</text>
  </view>
</template>

<style scoped>
.empty-state {
  display: grid;
  min-height: 240px;
  padding: 28px 20px;
  place-items: center;
  color: var(--muted);
  text-align: center;
}

.empty-title {
  margin-bottom: 4px;
  color: var(--text);
  font-weight: 700;
}

.empty-text {
  color: var(--muted);
  font-size: 13px;
}
</style>
