"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let shia;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: false,
    titleBarStyle: "hidden",
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

function summonShia() {
  // Create the browser window.
  shia = new BrowserWindow({
    width: 800,
    height: 580,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  var screenElectron = require("electron").screen;

  var size = screenElectron.getPrimaryDisplay().bounds;
  console.log(size);
  var x = size.width - 800;
  var y = size.height - 580;
  shia.setPosition(x, y, false);
  shia.setIgnoreMouseEvents(true);

  // and load the index.html of the app.
  shia.loadFile("shia.html");

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  shia.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
  setTimeout(() => {
    if (shia != null) {
      shia.destroy();
    }
  }, 11000);
  shia.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    shia = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

//IPC

ipcMain.on("HeresShia", (event, arg) => {
  console.log("its shia!!"); // prints "ping"
  summonShia();
});

ipcMain.on("KillShia", (event, arg) => {
  console.log("Kill Shia"); // prints "ping"
  if (shia != null) {
    shia.destroy();
  }
});
