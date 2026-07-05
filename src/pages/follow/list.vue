<template>
  <view class="screen">
    <AppHeader
      title="跟进记录列表"
      right-text="刷新"
      :right-disabled="refreshing || loadingMore"
      @back="handleBack"
      @right="handleManualRefresh"
    />

    <view class="project-summary" aria-label="项目摘要">
      <view class="summary-main">
        <text class="summary-title">星巴克臻选陈列沟通</text>
        <text class="summary-meta">{{ summaryMeta }}</text>
      </view>
      <text class="status-chip">跟进中</text>
    </view>

    <view class="record-list" aria-label="跟进记录列表">
      <RecordSkeletonList v-if="loading" :count="PAGE_SIZE" />

      <ErrorState v-else-if="errorMessage" :message="errorMessage" @retry="loadFirstPage('retry')" />

      <template v-else>
        <EmptyState v-if="records.length === 0" />
        <RecordCard v-for="record in records" v-else :key="record.id" :record="record" />
        <ListState v-if="records.length > 0" :loading-more="loadingMore" :has-more="hasMore" />
      </template>
    </view>

    <button class="fab" type="default" aria-label="添加跟进记录" @tap="goAdd">+</button>
    <view class="app-footer">本应用由 uni-app + Vue3 实现</view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
import { onLoad, onPullDownRefresh, onReachBottom, onUnload } from "@dcloudio/uni-app";
import AppHeader from "../../components/AppHeader.vue";
import EmptyState from "../../components/EmptyState.vue";
import ErrorState from "../../components/ErrorState.vue";
import ListState from "../../components/ListState.vue";
import RecordCard from "../../components/RecordCard.vue";
import RecordSkeletonList from "../../components/RecordSkeletonList.vue";
import { PAGE_SIZE, listFollowRecords } from "../../api/followRecords.js";

const records = ref([]);
const page = ref(0);
const total = ref(0);
const hasMore = ref(true);
const loading = ref(true);
const refreshing = ref(false);
const loadingMore = ref(false);
const errorMessage = ref("");

const summaryMeta = computed(() => {
  if (loading.value) return "正在加载跟进记录";
  return `共 ${total.value} 条跟进记录 · 每页 ${PAGE_SIZE} 条`;
});

function showToast(title) {
  uni.showToast({
    title,
    icon: "none",
    duration: 1500,
  });
}

async function loadFirstPage(mode = "initial") {
  const isInitial = mode === "initial" && records.value.length === 0;
  loading.value = isInitial;
  refreshing.value = !isInitial;
  hasMore.value = true;
  errorMessage.value = "";

  try {
    const response = await listFollowRecords({ page: 1, pageSize: PAGE_SIZE });
    records.value = response.records;
    page.value = response.page;
    total.value = response.total;
    hasMore.value = response.hasMore;

    if (mode === "refresh") showToast("刷新成功，已回到第一页");
    if (mode === "saved") showToast("跟进记录已保存");
  } catch {
    errorMessage.value = "跟进记录暂时无法加载，请检查后重试。";
    if (!isInitial) showToast("刷新失败，请重试");
  } finally {
    loading.value = false;
    refreshing.value = false;
    uni.stopPullDownRefresh();
  }
}

async function loadNextPage() {
  if (loading.value || refreshing.value || loadingMore.value || !hasMore.value) return;

  loadingMore.value = true;
  try {
    const response = await listFollowRecords({
      page: page.value + 1,
      pageSize: PAGE_SIZE,
    });
    records.value = [...records.value, ...response.records];
    page.value = response.page;
    total.value = response.total;
    hasMore.value = response.hasMore;
  } catch {
    showToast("下一页加载失败，请重试");
  } finally {
    loadingMore.value = false;
  }
}

function handleManualRefresh() {
  loadFirstPage("refresh");
}

function handleRecordCreated() {
  loadFirstPage("saved");
}

function handleBack() {
  showToast("当前页面为跟进记录列表");
}

function goAdd() {
  uni.navigateTo({
    url: "/pages/follow/add",
  });
}

onLoad(() => {
  loadFirstPage();
  uni.$on("follow-record-created", handleRecordCreated);
});

onUnload(() => {
  uni.$off("follow-record-created", handleRecordCreated);
});

onPullDownRefresh(() => {
  loadFirstPage("refresh");
});

onReachBottom(() => {
  loadNextPage();
});
</script>

<style scoped>
.screen {
  position: relative;
  min-height: 100vh;
  padding-bottom: calc(54px + env(safe-area-inset-bottom));
  background: var(--app-bg);
}

.project-summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}

.summary-main {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.summary-title,
.summary-meta {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary-title {
  color: var(--text);
  font-size: 15px;
  font-weight: 700;
}

.summary-meta {
  color: var(--muted);
  font-size: 12px;
}

.status-chip {
  padding: 4px 8px;
  border: 1px solid #b7dad3;
  border-radius: 6px;
  background: #edf8f5;
  color: var(--success);
  font-size: 12px;
  font-weight: 700;
}

.record-list {
  display: grid;
  gap: 10px;
  padding: 12px 12px 24px;
}

.fab {
  position: fixed;
  right: max(16px, calc((100vw - 430px) / 2 + 16px));
  bottom: calc(46px + env(safe-area-inset-bottom));
  z-index: 12;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 50%;
  background: var(--primary);
  color: #ffffff;
  font-size: 28px;
  line-height: 1;
}

.fab:active {
  background: var(--primary-strong);
}

.app-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 36px;
  display: grid;
  place-items: center;
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
  background: var(--app-bg);
  color: var(--quiet);
  font-size: 11px;
}

@media screen and (min-width: 540px) {
  .app-footer {
    right: calc((100vw - 430px) / 2);
    left: calc((100vw - 430px) / 2);
    border-right: 1px solid var(--line-strong);
    border-left: 1px solid var(--line-strong);
  }
}

@media screen and (max-width: 360px) {
  .project-summary {
    grid-template-columns: 1fr;
  }

  .status-chip {
    justify-self: start;
  }
}
</style>
