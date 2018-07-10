module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        wx: true,
        Page: true,
        App: true,
        getApp: true
    },
    "extends": "eslint:recommended",
    "plugins": [
        "eslint-plugin-standard",
        "html"
    ],
    "settings": {
        "html/html-extensions": [".html", ".we",".wxml"],  // consider .html and .we files as HTML
    },
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "semi": [
            "error",
            "always"
        ],
        "indent": [
            2,
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "off",
            "single"
        ],
        "no-console": 1,
    }
};