const fs = require('fs');
const ini = require('ini');

const defaultConfig = {
    key: "CommandOrControl+Shift+g",
    showDevTools: false
}

const getConfig = (configFilePath) => {
    const content = fs.existsSync(configFilePath) ? fs.readFileSync(configFilePath).toString() : "";
    const parsed = ini.parse(content)
    return {
        key: parsed.briskchat.key || defaultConfig.key,
        showDevTools: parsed.briskchat.showDevTools || defaultConfig.showDevTools
    }
}

module.exports = {
    getConfig
};