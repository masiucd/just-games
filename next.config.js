const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
})

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  productionBrowserSourceMaps: true,
})

module.exports = {
  productionBrowserSourceMaps: true,
}
