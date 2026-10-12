const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownItFootnote = require("markdown-it-footnote");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Footnotes: [^1] references and ^[inline] notes
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/resume.pdf");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // Content hash for cache busting: href="/css/style.css?v={{ '/css/style.css' | assetHash }}"
  eleventyConfig.addFilter("assetHash", (assetPath) => {
    const contents = fs.readFileSync(path.join("src", assetPath));
    return crypto.createHash("md5").update(contents).digest("hex").slice(0, 8);
  });

  // Add date filter for post dates - MM.DD.YYYY format
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}.${day}.${year}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
