<template>
  <view class="app-header">
    <button
      v-if="showBack"
      class="icon-button"
      type="default"
      aria-label="返回"
      @tap="$emit('back')"
    >
      ‹
    </button>
    <view v-else class="header-spacer" />

    <text class="header-title">{{ title }}</text>

    <button
      v-if="rightText"
      class="header-action"
      type="default"
      :disabled="rightDisabled"
      @tap="$emit('right')"
    >
      {{ rightText }}
    </button>
    <view v-else class="header-spacer" />
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  rightText: {
    type: String,
    default: "",
  },
  rightDisabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["back", "right"]);
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 58px;
  align-items: center;
  min-height: calc(48px + env(safe-area-inset-top));
  padding-top: env(safe-area-inset-top);
  background: var(--primary);
  color: #ffffff;
}

.header-title {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 700;
}

.icon-button,
.header-action {
  min-height: 44px;
  border-radius: var(--radius);
  color: inherit;
}

.icon-button {
  display: grid;
  width: 44px;
  margin: 2px;
  place-items: center;
  font-size: 24px;
  line-height: 1;
}

.header-action {
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.icon-button:active,
.header-action:active {
  background: rgba(255, 255, 255, 0.12);
}

.header-action[disabled] {
  opacity: 0.58;
}

.header-spacer {
  width: 48px;
  height: 44px;
}
</style>
