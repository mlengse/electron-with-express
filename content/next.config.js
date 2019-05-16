const withTypescript = require("@zeit/next-typescript"),
  withCSS = require("@zeit/next-css");

module.exports = withCSS(withTypescript(), {
  cssModules: true
});
