'use strict';
const electron = require('electron');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
// require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	mainWindow = new electron.BrowserWindow({
		width: 652,
		height: 502,
		transparent:true,
		titleBarStyle: 'hidden-inset',
		backgroundColor: '#2e2c29'
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.webContents.openDevTools();


	mainWindow.on('closed', onClosed);

	return mainWindow;
}

app.commandLine.appendSwitch('enable-transparent-visuals');

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
	app.quit();
}
});

app.on('activate', () => {
	if (!mainWindow) {
	mainWindow = createMainWindow();
}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

app.on('ready-to-show',function() {
	var electronVibrancy = require('electron-vibrancy');
	electronVibrancy.SetVibrancy(mainWindow, 7);
});
