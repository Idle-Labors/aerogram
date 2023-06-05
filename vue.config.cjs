const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV !== "production" ? false : undefined,
  pages: {
    index: {
      entry: "src/main.js",
      title: "Aerogram",
    },
  },
});
