<template>
  <view class="skeleton-list" aria-hidden="true">
    <view v-for="index in count" :key="index" class="record-card skeleton" :style="{ '--i': index - 1 }" />
  </view>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 5,
  },
});
</script>

<style scoped>
.skeleton-list {
  display: grid;
  gap: 10px;
}

.record-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.skeleton {
  min-height: 142px;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.78), transparent),
    linear-gradient(var(--surface-muted), var(--surface-muted)),
    linear-gradient(var(--surface-muted), var(--surface-muted)),
    linear-gradient(var(--surface-muted), var(--surface-muted)),
    linear-gradient(var(--surface-muted), var(--surface-muted));
  background-repeat: no-repeat;
  background-position:
    calc(-80% + var(--i, 0) * 10%) 0,
    13px 17px,
    13px 50px,
    13px 74px,
    13px 111px;
  background-size:
    46% 100%,
    58% 14px,
    86% 12px,
    92% 12px,
    72% 12px;
  animation: loading-shine 1.1s ease-in-out infinite;
}

@keyframes loading-shine {
  to {
    background-position:
      180% 0,
      13px 17px,
      13px 50px,
      13px 74px,
      13px 111px;
  }
}
</style>
