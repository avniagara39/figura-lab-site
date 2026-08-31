import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Passthrough: static assets go straight to _site/
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Watch for CSS/JS changes
  eleventyConfig.addWatchTarget("assets/css/");
  eleventyConfig.addWatchTarget("assets/js/");

  // HTML base plugin for path normalization
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Add current year shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add "isActive" filter: returns true if current page.url matches nav item url
  // Usage in template: page.url | isActive(item.url)
  eleventyConfig.addFilter("isActive", function (pageUrl, navUrl) {
    if (!pageUrl) return false;
    if (navUrl === "/" && pageUrl === "/") return true;
    if (navUrl !== "/" && pageUrl.startsWith(navUrl)) return true;
    return false;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layouts: "_includes/layouts",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
