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
    baseUrl: "gene-jelly.github.io/genes-bazaar",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "published",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: { name: "IM Fell English SC", weights: [400] },
        body: { name: "IM Fell English", weights: [400], includeItalic: true },
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#f0e8d0",       // aged paper stock — dirtier than parchment
          lightgray: "#d4c9a8",   // visible rule lines, like aged margins
          gray: "#8a7d65",        // muted annotations
          darkgray: "#2c2416",    // near-black letterpress ink
          dark: "#1a1408",        // deep ink for headers
          secondary: "#8b1a1a",   // dark red — Chaos stars, blood, drop caps
          tertiary: "#5c3317",    // dark brown — leather binding, tertiary links
          highlight: "rgba(139, 26, 26, 0.08)",
          textHighlight: "rgba(139, 26, 26, 0.15)",
        },
        darkMode: {
          light: "#1a150e",       // near-black aged paper
          lightgray: "#2e2820",   // dark rule lines
          gray: "#6b6050",        // muted
          darkgray: "#d8cdb8",    // aged ink on dark stock
          dark: "#ece0c8",        // light headers on dark
          secondary: "#c44040",   // brighter red for dark mode legibility
          tertiary: "#a07050",    // warm brown
          highlight: "rgba(196, 64, 64, 0.10)",
          textHighlight: "rgba(196, 64, 64, 0.18)",
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
