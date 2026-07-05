export function validateFollowRecord(values) {
  const errors = {};

  if (!values.title.trim()) {
    errors.title = "主题内容为必填项";
  }

  if (!values.detail.trim()) {
    errors.detail = "沟通详情为必填项";
  }

  return errors;
}
