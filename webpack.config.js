const {merge} = require('webpack-merge');

const customModules = require("./config/webpack.modules.js");
const customAliases = require("./config/webpack.aliases.js");
const customPlugins = require("./config/webpack.plugins.js");

const sharingEntry = require("./config/sharing.entry.js");
const appEntry = require("./config/app.entry.js");
const adminEntry = require("./config/admin.entry.js");

const common = merge(customModules, customAliases, customPlugins);

module.exports = [
    merge(sharingEntry, common),
    merge(appEntry, common),
    merge(adminEntry, common)
];