const Store = require("electron-store");

const store = new Store();

function setting(key, value) {
  if (store.get(key) === undefined) {
    store.set(key, value);
  } else {
    return store.get(key);
  }
}

module.exports = setting;
