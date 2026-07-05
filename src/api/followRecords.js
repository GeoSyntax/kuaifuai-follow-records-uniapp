import { mockRecords } from "../mock/followRecords.js";

export const PAGE_SIZE = 5;

const STORAGE_KEY = "kuafuai-follow-records-uniapp-v1";
const LEGACY_STORAGE_KEY = "kuafuai-follow-records-v4";
const MOCK_DELAY = 320;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readStorageValue(key) {
  try {
    if (typeof uni !== "undefined" && uni.getStorageSync) {
      return uni.getStorageSync(key);
    }

    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }
  } catch {
    return [];
  }

  return [];
}

function writeStorageValue(key, value) {
  if (typeof uni !== "undefined" && uni.setStorageSync) {
    uni.setStorageSync(key, value);
    return;
  }

  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

function normalizeStoredRecords(value) {
  if (Array.isArray(value)) return value;

  if (typeof value === "string" && value) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function readSavedRecords() {
  const current = normalizeStoredRecords(readStorageValue(STORAGE_KEY));
  const legacy = normalizeStoredRecords(readStorageValue(LEGACY_STORAGE_KEY));
  const seen = new Set();

  return [...current, ...legacy].filter((record) => {
    if (!record?.id || seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  });
}

function writeSavedRecords(records) {
  writeStorageValue(STORAGE_KEY, records);
}

export function getAllFollowRecords() {
  return [...readSavedRecords(), ...mockRecords].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export async function listFollowRecords({ page = 1, pageSize = PAGE_SIZE } = {}) {
  await delay(MOCK_DELAY);

  const all = getAllFollowRecords();
  const start = (page - 1) * pageSize;
  const records = all.slice(start, start + pageSize);

  return {
    records,
    total: all.length,
    page,
    pageSize,
    hasMore: start + records.length < all.length,
  };
}

export async function createFollowRecord(payload) {
  await delay(MOCK_DELAY);

  const saved = readSavedRecords();
  const record = {
    id: `local-${Date.now()}`,
    title: payload.title.trim(),
    detail: payload.detail.trim(),
    nextAt: payload.nextAt || "",
    nextContent: payload.nextContent.trim() || "待安排下次沟通内容。",
    createdAt: new Date().toISOString(),
  };

  writeSavedRecords([record, ...saved]);
  return record;
}
