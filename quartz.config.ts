import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Gene's Bazaar",
    pageTitleSuffix: " — Gene's Bazaar",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "genes-bazaar.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "published",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display",
        body: "Crimson Pro",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fdf6e3",
          lightgray: "#e8dcc8",
          gray: "#b8a88a",
          darkgray: "#4a3f35",
          dark: "#2c241c",
          secondary: "#8b4513",
          tertiary: "#b8860b",
          highlight: "rgba(184, 134, 11, 0.12)",
          textHighlight: "#ffd70044",
        },
        darkMode: {
          light: "#1a1410",
          lightgray: "#332b22",
          gray: "#7a6b5a",
          darkgray: "#d4c8b8",
          dark: "#f0e6d6",
          secondary: "#d4a050",
          tertiary: "#c4956a",
          highlight: "rgba(212, 160, 80, 0.12)",
          textHighlight: "#d4a05044",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
