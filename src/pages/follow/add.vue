<template>
  <view class="screen form-screen">
    <AppHeader title="添加跟进记录" @back="handleCancel" />

    <view class="form-scroll">
      <view class="form-card" aria-label="添加跟进记录表单">
        <view class="field">
          <view class="label-row">
            <text class="field-label">主题内容 <text class="required">*</text></text>
            <text class="counter">{{ form.title.length }}/40</text>
          </view>
          <input
            v-model="form.title"
            class="control"
            :class="{ 'is-invalid': errors.title }"
            type="text"
            maxlength="40"
            placeholder="请输入本次跟进主题"
            placeholder-class="placeholder"
            confirm-type="next"
            @input="clearError('title')"
          />
          <text class="field-error">{{ errors.title }}</text>
        </view>

        <view class="field">
          <view class="label-row">
            <text class="field-label">沟通详情 <text class="required">*</text></text>
            <text class="counter">{{ form.detail.length }}/300</text>
          </view>
          <textarea
            v-model="form.detail"
            class="control textarea"
            :class="{ 'is-invalid': errors.detail }"
            maxlength="300"
            placeholder="请输入沟通过程、客户诉求、当前结论"
            placeholder-class="placeholder"
            @input="clearError('detail')"
          />
          <text class="field-error">{{ errors.detail }}</text>
        </view>

        <view class="field">
          <text class="field-label">下次沟通时间</text>
          <view class="picker-grid">
            <picker mode="date" :value="form.nextDate" @change="handleDateChange">
              <view class="picker-control">{{ form.nextDate || "选择日期" }}</view>
            </picker>
            <picker mode="time" :value="form.nextTime" @change="handleTimeChange">
              <view class="picker-control">{{ form.nextTime || "选择时间" }}</view>
            </picker>
          </view>
          <text class="field-hint">可选，用于安排下一次沟通。</text>
        </view>

        <view class="field">
          <view class="label-row">
            <text class="field-label">下次沟通内容</text>
            <text class="counter">{{ form.nextContent.length }}/180</text>
          </view>
          <textarea
            v-model="form.nextContent"
            class="control textarea compact"
            maxlength="180"
            placeholder="请输入下次需要推进的事项"
            placeholder-class="placeholder"
          />
          <text class="field-hint">未填写时会自动保存为待安排。</text>
        </view>
      </view>
    </view>

    <view class="form-actions">
      <button class="button primary" type="default" :loading="saving" :disabled="saving" @tap="handleSubmit">
        {{ saving ? "保存中..." : "保存" }}
      </button>
      <button class="button secondary" type="default" :disabled="saving" @tap="handleCancel">取消</button>
    </view>
  </view>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import AppHeader from "../../components/AppHeader.vue";
import { createFollowRecord } from "../../api/followRecords.js";
import { combineDateTime, getDefaultNextDateParts } from "../../utils/date.js";
import { validateFollowRecord } from "../../utils/validation.js";

const defaultParts = getDefaultNextDateParts();
const saving = ref(false);

const form = reactive({
  title: "",
  detail: "",
  nextDate: defaultParts.date,
  nextTime: defaultParts.time,
  nextContent: "",
});

const errors = reactive({
  title: "",
  detail: "",
});

const hasUnsavedInput = computed(() => {
  return Boolean(
    form.title.trim() ||
      form.detail.trim() ||
      form.nextContent.trim() ||
      form.nextDate !== defaultParts.date ||
      form.nextTime !== defaultParts.time,
  );
});

function clearError(field) {
  if (errors[field]) errors[field] = "";
}

function handleDateChange(event) {
  form.nextDate = event.detail.value;
}

function handleTimeChange(event) {
  form.nextTime = event.detail.value;
}

function applyErrors(nextErrors) {
  errors.title = nextErrors.title || "";
  errors.detail = nextErrors.detail || "";
}

function getPayload() {
  return {
    title: form.title.trim(),
    detail: form.detail.trim(),
    nextAt: combineDateTime(form.nextDate, form.nextTime),
    nextContent: form.nextContent.trim(),
  };
}

function goBack() {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
    return;
  }

  uni.redirectTo({
    url: "/pages/follow/list",
  });
}

function handleCancel() {
  if (saving.value) return;

  if (hasUnsavedInput.value) {
    uni.showModal({
      title: "放弃编辑？",
      content: "当前内容尚未保存，确认返回列表页吗？",
      confirmText: "放弃",
      cancelText: "继续填写",
      success: (result) => {
        if (result.confirm) goBack();
      },
    });
    return;
  }

  goBack();
}

async function handleSubmit() {
  if (saving.value) return;

  const payload = getPayload();
  const nextErrors = validateFollowRecord(payload);
  applyErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) {
    uni.showToast({
      title: "请先补全必填项",
      icon: "none",
      duration: 1500,
    });
    return;
  }

  saving.value = true;
  try {
    await createFollowRecord(payload);
    uni.$emit("follow-record-created");
    goBack();
  } catch {
    uni.showToast({
      title: "保存失败，请重试",
      icon: "none",
      duration: 1500,
    });
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.form-screen {
  min-height: 100vh;
  padding-bottom: calc(70px + env(safe-area-inset-bottom));
  background: var(--app-bg);
}

.form-scroll {
  padding: 14px 14px 18px;
}

.form-card {
  display: grid;
  gap: 16px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.field {
  display: grid;
  gap: 7px;
}

.label-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
}

.field-label {
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
}

.required {
  color: var(--danger);
}

.counter,
.field-hint {
  color: var(--quiet);
  font-size: 12px;
}

.control,
.picker-control {
  width: 100%;
  min-height: 42px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: #ffffff;
  color: var(--text);
  font-size: 14px;
}

.control {
  padding: 8px 10px;
}

.textarea {
  min-height: 116px;
  padding: 10px;
}

.textarea.compact {
  min-height: 86px;
}

.is-invalid {
  border-color: var(--danger);
}

.field-error {
  min-height: 18px;
  color: var(--danger);
  font-size: 12px;
}

.picker-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.picker-control {
  display: grid;
  align-items: center;
  padding: 0 10px;
}

.form-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 12px 14px calc(12px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
  background: var(--surface);
}

.button {
  min-height: 44px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  font-weight: 700;
}

.button.primary {
  border-color: var(--primary);
  background: var(--primary);
  color: #ffffff;
}

.button.primary:active {
  background: var(--primary-strong);
}

.button.secondary {
  background: #ffffff;
}

.button[disabled] {
  opacity: 0.68;
}

@media screen and (min-width: 540px) {
  .form-actions {
    right: calc((100vw - 430px) / 2);
    left: calc((100vw - 430px) / 2);
    border-right: 1px solid var(--line-strong);
    border-left: 1px solid var(--line-strong);
  }
}

@media screen and (max-width: 340px) {
  .picker-grid {
    grid-template-columns: 1fr;
  }
}
</style>
