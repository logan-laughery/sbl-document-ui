function error(...args) {
  // eslint-disable-next-line
  console.error(...args);
}

function warn(...args) {
  // eslint-disable-next-line
  console.warn(...args);
}

function info(...args) {
  // eslint-disable-next-line
  console.log(...args);
}

function debug(...args) {
  // eslint-disable-next-line
  console.debug(...args);
}

export default {
  error,
  warn,
  info,
  debug,
};
