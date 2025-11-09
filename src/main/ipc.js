const { ipcMain } = require("electron");
const auth = require("./auth-local");

function registerAuthIpc() {
  auth.ensureSeed();
  ipcMain.handle("auth:register", async (_e, d) => auth.register(d.username, d.password));
  ipcMain.handle("auth:login",    async (_e, d) => auth.login(d.username, d.password));
  ipcMain.handle("auth:getCurrent", async () => auth.getCurrent());
  ipcMain.handle("auth:logout", async () => { auth.logout(); return true; });
}

module.exports = { registerAuthIpc };
