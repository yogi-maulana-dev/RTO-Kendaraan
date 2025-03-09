"use strict";
const { contextBridge, ipcRenderer } = require("electron");

// Expose ipcRenderer methods
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args2) =>
      listener(event, ...args2)
    );
  },
  off(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});

// Expose dialog.showMessageBox
contextBridge.exposeInMainWorld("electron", {
  dialog: {
    showMessageBox: (options) =>
      ipcRenderer.invoke("show-message-box", options),
  },
});
