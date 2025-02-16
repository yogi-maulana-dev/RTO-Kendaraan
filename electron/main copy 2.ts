import { app, BrowserWindow } from "electron";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Definisikan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win: BrowserWindow;
let phpServer: any;

function startPHPServer() {
  const phpPath = path.join(__dirname, "../backend"); // Pastikan path benar
  phpServer = exec(
    `php -S 127.0.0.1:8000 -t "${phpPath}"`,
    (error, stdout, stderr) => {
      if (error) console.error(`PHP Server Error: ${error}`);
      if (stderr) console.error(`PHP Server Stderr: ${stderr}`);
    }
  );

  console.log("PHP server started at http://127.0.0.1:8000");
}

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:3000"); // Ganti dengan URL Vite saat dev
}

app.whenReady().then(() => {
  startPHPServer();
  createWindow();
});

app.on("window-all-closed", () => {
  if (phpServer) phpServer.kill(); // Matikan server PHP saat aplikasi ditutup
  app.quit();
});
