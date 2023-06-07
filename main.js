const { app, Menu, nativeImage, globalShortcut, Tray } = require("electron")
const path = require("path");
const { menubar } = require('menubar');
const { getConfig } = require("./config.js");

const configFilePath = path.join(app.getPath("userData"), 'config.ini');
const configuration = getConfig(configFilePath);

const icon = nativeImage.createFromPath(path.join(__dirname, "assets/logo.png"))

const isDigit = (str) => /^\d$/.test(str);

const addTrayMenu = (tray) => {
    const contextMenu = Menu.buildFromTemplate([
        { label: "Quit", role: "quit" },
    ])
    // We don't use setContextMenu so that left click won't show the menu
    tray.on('right-click', () => {
        tray.popUpContextMenu(contextMenu);
    });
}

const registerShowWindowShortcut = (mb) => {
    globalShortcut.register(configuration.key, () => {
        if (mb.window?.isVisible() || false) {
            mb.hideWindow();
        } else {
            mb.showWindow();
        }
    });
}

const avoidFlashOnFirstShow = (mb) => {
    mb.app.commandLine.appendSwitch('disable-backgrounding-occluded-windows', 'true');
}

const refocusLastWindowOnHide = (mb) => {
    mb.on('after-hide', () => { mb.app.hide() })
}

const addChooseChatFunctionToBrowserWindow = (window) => {
    window.executeJavaScript(`
      const chooseChat = (index) => {
        const nav = document.querySelector("nav");
        if (nav == null) {
          return;
        }
        const chats = nav.querySelectorAll("a");
        const shiftRightIndex = (index == 0) ? 9 : index - 1;
        const normalizedIndex = shiftRightIndex + 3;
        if (normalizedIndex > chats.length) {
          return;
        }
        chats[normalizedIndex].click();
      }
    `)
}

app.on('ready', () => {
    const mb = menubar({
        browserWindow: {
            width: 1200,
            height: 800,
            icon: icon,
            alwaysOnTop: true,
            title: "BriskChat",
        },
        index: "https://chat.openai.com",
        showDockIcon: false,
        showOnAllWorkspaces: true,
        tooltip: "BriskChat",
        preloadWindow: true,
        icon: icon.resize({ width: 16, height: 16 })
    })

    avoidFlashOnFirstShow(mb)
    refocusLastWindowOnHide(mb)

    mb.on('ready', () => {
        addTrayMenu(mb.tray);
        registerShowWindowShortcut(mb)
        mb.window.webContents.on('did-finish-load', () => {
            addChooseChatFunctionToBrowserWindow(mb.window.webContents)
            mb.window.webContents.on("before-input-event", (event, input) => {
                const { control, meta, key } = input;
                const isControlOrMeta = process.platform !== "darwin" ? control : meta;
                if (isControlOrMeta && isDigit(key)) {
                    mb.window.webContents.executeJavaScript(`chooseChat(parseInt(${key}));`);
                }
            })
        })
        if (configuration.showDevTools) mb.window.openDevTools();
    });
})