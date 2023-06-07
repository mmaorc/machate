const fs = require('fs');
const ini = require('ini');

const defaultConfig = {
    key: "CommandOrControl+Shift+g",
    showDevTools: false
}

const fillConfigWithDefaults = (config) => {
    return { ...defaultConfig, ...config }
}

const getConfig = (configFilePath) => {
    const fileContent = fs.existsSync(configFilePath) ? fs.readFileSync(configFilePath).toString() : "";
    const fileConfig = ini.parse(fileContent)
    const fullConfig = fillConfigWithDefaults(fileConfig);
    if (fullConfig != fileConfig) {
        fs.writeFileSync(configFilePath, ini.stringify(fullConfig))
    }
    return fullConfig;
}

module.exports = {
    getConfig
};