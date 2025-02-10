const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  
  // Ensure TSX, JSX, and other file extensions are supported
  config.resolver.sourceExts.push("jsx", "js", "ts", "tsx");

  // Make sure Metro is aware of the src directory
  config.watchFolders = [path.resolve(__dirname, "src")];

  // Optionally, set projectRoot if you want Metro to start from a specific directory
  config.projectRoot = path.resolve(__dirname, "src");

  return config;
})();
