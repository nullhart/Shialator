var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './Releases/shialator-win32-x64/',
  outputDirectory: '/packaged/build/installer64',
  authors: 'Nully Studios',
  exe: 'shialator.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));