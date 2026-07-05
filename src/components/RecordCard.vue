<template>
  <view class="record-card">
    <view class="record-title-row">
      <text class="record-title">{{ record.title }}</text>
      <text class="record-date">{{ formatShortDate(record.createdAt) }}</text>
    </view>

    <view class="record-detail-block">
      <text class="block-label">沟通详情</text>
      <text class="detail-text">{{ record.detail }}</text>
    </view>

    <view class="next-block">
      <text class="next-label">下次沟通</text>
      <text class="next-text">{{ nextText }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { formatFullDate, formatShortDate } from "../utils/date.js";

const props = defineProps({
  record: {
    type: Object,
    required: true,
  },
});

const nextText = computed(() => {
  const content = props.record.nextContent || "待安排";
  return `${formatFullDate(props.record.nextAt)} · ${content}`;
});
</script>

<style scoped>
.record-card {
  display: grid;
  gap: 10px;
  padding: 13px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.record-title-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
}

.record-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
}

.record-date {
  color: var(--quiet);
  font-size: 12px;
  white-space: nowrap;
}

.record-detail-block,
.next-block {
  display: grid;
  gap: 4px;
}

.block-label,
.next-label {
  color: var(--quiet);
  font-size: 12px;
}

.detail-text,
.next-text {
  display: -webkit-box;
  overflow: hidden;
  color: var(--muted);
  font-size: 13px;
  -webkit-box-orient: vertical;
}

.detail-text {
  -webkit-line-clamp: 2;
}

.next-block {
  padding-top: 8px;
  border-top: 1px solid var(--line);
}

.next-label {
  color: var(--warning);
  font-weight: 700;
}

.next-text {
  -webkit-line-clamp: 1;
}

@media screen and (max-width: 360px) {
  .record-title-row {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>
