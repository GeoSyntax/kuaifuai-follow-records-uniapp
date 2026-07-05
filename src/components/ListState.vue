<template>
  <view class="list-state">
    <text>{{ label }}</text>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  loadingMore: {
    type: Boolean,
    default: false,
  },
  hasMore: {
    type: Boolean,
    default: true,
  },
});

const label = computed(() => {
  if (props.loadingMore) return "正在自动加载下一页...";
  if (props.hasMore) return "还有更多跟进记录";
  return "已加载全部数据";
});
</script>

<style scoped>
.list-state {
  min-height: 42px;
  display: grid;
  place-items: center;
  color: var(--quiet);
  font-size: 13px;
}
</style>
