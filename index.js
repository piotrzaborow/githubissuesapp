'use strict';
const electron = require('electron');
var electronVibrancy = require('electron-vibrancy');


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
		titleBarStyle: 'hidden-inset',
        scrollBounce: true,
	});


    mainWindow.loadURL(`file://${__dirname}/index.html`);

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
	electronVibrancy.SetVibrancy(mainWindow, 1);
});
