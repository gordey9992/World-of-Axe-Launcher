const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("woa", {
  auth: {
    register: (u,p) => ipcRenderer.invoke("auth:register", { username:u, password:p }),
    login:    (u,p) => ipcRenderer.invoke("auth:login",    { username:u, password:p }),
    current:  ()    => ipcRenderer.invoke("auth:getCurrent"),
    logout:   ()    => ipcRenderer.invoke("auth:logout")
  }
});
