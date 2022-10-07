module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["vue"],
    rules: {
        semi: ["error", "always"],
        "no-undef": "off",
        "no-unused-vars": "off",
        "object-curly-spacing": [
            "error",
            "always",
            { objectsInObjects: false },
        ],
        "no-constant-condition": "off",
    },
};
