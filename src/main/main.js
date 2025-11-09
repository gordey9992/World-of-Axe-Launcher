const path = require("path");
const { app, BrowserWindow } = require("electron");
const { registerAuthIpc } = require("./ipc");

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    title: "World of Axe Launcher",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });
  win.loadFile(path.join(__dirname, "../renderer/index.html"));
}

app.whenReady().then(() => {
  registerAuthIpc();
  createWindow();
});
