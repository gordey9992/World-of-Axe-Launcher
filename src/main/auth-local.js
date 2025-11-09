const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const STORE = path.join(app.getPath("userData"), "woa-users.json");

function readStore() {
  if (!fs.existsSync(STORE)) return { users: [], currentUser: null };
  try { return JSON.parse(fs.readFileSync(STORE, "utf8")); }
  catch { return { users: [], currentUser: null }; }
}
function writeStore(d) {
  fs.writeFileSync(STORE, JSON.stringify(d, null, 2));
}

async function register(username, password) {
  const d = readStore();
  if (!username || !password) throw new Error("Введите логин и пароль");
  if (d.users.find(u => u.username === username)) throw new Error("Пользователь уже существует");

  const hash = await bcrypt.hash(password, 10);
  d.users.push({ username, passwordHash: hash });
  d.currentUser = username;

  writeStore(d);
  return { username };
}

async function login(username, password) {
  const d = readStore();
  const u = d.users.find(e => e.username === username);
  if (!u) throw new Error("Неверный логин или пароль");

  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) throw new Error("Неверный логин или пароль");

  d.currentUser = username;
  writeStore(d);
  return { username };
}

function logout() {
  const d = readStore();
  d.currentUser = null;
  writeStore(d);
}

function getCurrent() {
  const d = readStore();
  return d.currentUser ? { username: d.currentUser } : null;
}

function ensureSeed() {
  const d = readStore();
  if (!d.users.some(u => u.username === "12345")) {
    const hash = bcrypt.hashSync("123456", 10);
    d.users.push({ username: "12345", passwordHash: hash });
    writeStore(d);
  }
}

module.exports = { register, login, logout, getCurrent, ensureSeed };
