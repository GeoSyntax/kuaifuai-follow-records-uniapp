<script>
export default {
  onLaunch() {
    // uni-app application lifecycle entry.
  },
};
</script>

<style>
:root {
  --page-bg: #eceee9;
  --app-bg: #f8f8f5;
  --surface: #ffffff;
  --surface-muted: #eeeeea;
  --line: #deddd4;
  --line-strong: #c7c5ba;
  --text: #20201d;
  --muted: #66645c;
  --quiet: #8b897f;
  --primary: #5b55d6;
  --primary-strong: #4d47c7;
  --primary-soft: #f0efff;
  --success: #0f766e;
  --warning: #a16207;
  --danger: #b42318;
  --focus: rgba(91, 85, 214, 0.24);
  --radius: 8px;
  --font: "Microsoft YaHei UI", "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif;
}

page {
  min-height: 100%;
  background: var(--app-bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  line-height: 1.5;
}

view,
text,
button,
input,
textarea {
  box-sizing: border-box;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
}

button::after {
  border: 0;
}

input,
textarea {
  color: var(--text);
  font: inherit;
}

@media screen and (min-width: 540px) {
  body {
    margin: 0;
    background: var(--page-bg);
  }

  uni-page-body {
    max-width: 430px;
    min-height: 100vh;
    margin: 0 auto;
    overflow: hidden;
    border-right: 1px solid var(--line-strong);
    border-left: 1px solid var(--line-strong);
    background: var(--app-bg);
  }
}
</style>
