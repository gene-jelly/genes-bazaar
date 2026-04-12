// ─── Anthropic Ecosystem Map ──────────────────────────────────
// Interactive canvas visualization of the Anthropic product suite.
// Three-layer architecture rendered on parchment:
//
//   Layer 1 — Direct Products (things you touch)
//   Layer 2 — Platform (things developers build on)
//   Layer 3 — Programs (things you apply to)
//
// Filled cells = Gene uses it. Hollow cells = available but unused.
// Hover for descriptions.
//
// Aesthetic: WFRP 1e module meets knowledge cartography.
// Typography via @chenglou/pretext for Unicode-aware measurement.

import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext"

// ─── Palette (WFRP 1e parchment family) ──────────────────────

const INK = "#1a1408"
const SEPIA = "#5c4a38"
const PARCHMENT = "#f0e8d0"
const RULE = "#c4b898"
const WFRP_RED = "#8b1a1a"
const AMBER = "#c49a3a"
const GREEN_INK = "#2d5016"

// ─── Data ────────────────────────────────────────────────────

type Product = {
  name: string
  short: string
  uses: boolean
  layer: 1 | 2 | 3
  desc: string
  connects?: string[] // names of products it connects to
}

const PRODUCTS: Product[] = [
  // Layer 1 — Direct Products
  { name: "Claude.ai", short: "Chat", uses: true, layer: 1, desc: "Web & mobile chat interface. The front door." },
  { name: "Claude Code CLI", short: "Code CLI", uses: true, layer: 1, desc: "Terminal agentic coding. 85+ skills, 12 plugins, 6 MCP servers.", connects: ["MCP", "Skills", "Plugins"] },
  { name: "Claude Code Web", short: "Code Web", uses: false, layer: 1, desc: "Cloud VM execution. --remote, /teleport, auto-fix PRs.", connects: ["Claude Code CLI"] },
  { name: "Cowork", short: "Cowork", uses: false, layer: 1, desc: "Desktop agent. Local file access + Computer Use built-in.", connects: ["Skills", "Computer Use"] },
  { name: "Dispatch", short: "Dispatch", uses: false, layer: 1, desc: "Mobile task assignment. Start on phone, runs on desktop.", connects: ["Cowork"] },
  { name: "Computer Use", short: "Comp Use", uses: false, layer: 1, desc: "GUI automation. Opens apps, clicks, types, screenshots.", connects: ["Cowork", "Claude Code CLI"] },
  { name: "Excel Add-in", short: "Excel", uses: false, layer: 1, desc: "AI in spreadsheets. Debug errors, build models.", connects: ["Skills"] },
  { name: "PowerPoint", short: "PPT", uses: false, layer: 1, desc: "AI slide generation. Editable charts, not images.", connects: ["Skills", "Excel Add-in"] },
  { name: "Slack Integration", short: "Slack", uses: false, layer: 1, desc: "First-party from Anthropic. DM or thread mentions.", connects: ["Claude Code CLI"] },

  // Layer 2 — Platform
  { name: "Claude API", short: "API", uses: true, layer: 2, desc: "Direct model access. Opus, Sonnet, Haiku." },
  { name: "MCP", short: "MCP", uses: true, layer: 2, desc: "Model Context Protocol. THE integration backbone. 6 servers running.", connects: ["Claude Code CLI", "Connectors", "Plugins"] },
  { name: "Connectors", short: "Connect", uses: false, layer: 2, desc: "Browsable directory of MCP integrations.", connects: ["MCP"] },
  { name: "Plugins", short: "Plugins", uses: true, layer: 2, desc: "Bundled skills/hooks/MCP. 12 active from marketplace.", connects: ["Claude Code CLI", "Skills"] },
  { name: "Skills", short: "Skills", uses: true, layer: 2, desc: "Cross-platform reusable capabilities. THE unifying layer. 85+ installed.", connects: ["Claude.ai", "Claude Code CLI", "Excel Add-in", "PowerPoint", "Claude API"] },
  { name: "Marketplace", short: "Market", uses: false, layer: 2, desc: "Enterprise procurement. One contract covers partner tools. Limited preview." },

  // Layer 3 — Programs
  { name: "Startups", short: "Startups", uses: false, layer: 3, desc: "API credits + resources for startups. Meridian?" },
  { name: "Campus", short: "Campus", uses: false, layer: 3, desc: "Student Builder Clubs. CMU adjacent." },
  { name: "Partners", short: "Partners", uses: false, layer: 3, desc: "Powered by Claude directory. Cursor, Devin, etc." },
]

// ─── Typography ──────────────────────────────────────────────

function layoutText(
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string,
  maxWidth: number,
): { lines: string[]; width: number } {
  ctx.font = font
  const lines: string[] = []
  let width = 0
  try {
    const prepared = prepareWithSegments(text, font)
    const result = layoutWithLines(prepared, maxWidth, 16)
    for (const line of result.lines) {
      lines.push(line.text)
      width = Math.max(width, line.width)
    }
  } catch {
    const words = text.split(" ")
    let current = ""
    for (const w of words) {
      const test = current ? `${current} ${w}` : w
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current)
        current = w
      } else {
        current = test
      }
    }
    if (current) lines.push(current)
    width = Math.min(ctx.measureText(text).width, maxWidth)
  }
  if (lines.length === 0) lines.push(text)
  if (width === 0) width = Math.min(ctx.measureText(text).width, maxWidth)
  return { lines, width }
}

function drawSmallCaps(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  tracking: string,
) {
  const prevFont = ctx.font
  const prevSpacing = (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing
  ctx.font = font
  try {
    ;(ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = tracking
  } catch { /* older browsers */ }
  ctx.fillText(text.toUpperCase(), x, y)
  try {
    ;(ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = prevSpacing ?? "0px"
  } catch { /* ignore */ }
  ctx.font = prevFont
}

// ─── Geometry ────────────────────────────────────────────────

const CARD_W = 110
const CARD_H = 44
const CARD_GAP_X = 16
const CARD_GAP_Y = 14
const LAYER_GAP = 50
const PAD = 30

const LAYER_LABELS = ["I. Direct Products", "II. Platform", "III. Programs"]
const LAYER_SUBLABELS = [
  "Things you touch every day",
  "Things developers build on",
  "Things you apply to",
]

function getLayerProducts(layer: 1 | 2 | 3): Product[] {
  return PRODUCTS.filter((p) => p.layer === layer)
}

function getCardPositions(): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()
  let y = PAD + 50 // space for title

  for (let layer = 1; layer <= 3; layer++) {
    const prods = getLayerProducts(layer as 1 | 2 | 3)
    const cols = Math.min(prods.length, layer === 1 ? 5 : layer === 2 ? 5 : 3)
    const rows = Math.ceil(prods.length / cols)

    y += 32 // layer label space

    for (let i = 0; i < prods.length; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const rowWidth = Math.min(cols, prods.length - row * cols) * (CARD_W + CARD_GAP_X) - CARD_GAP_X
      const startX = PAD + (cols * (CARD_W + CARD_GAP_X) - CARD_GAP_X - rowWidth) / 2
      positions.set(prods[i].name, {
        x: startX + col * (CARD_W + CARD_GAP_X),
        y: y + row * (CARD_H + CARD_GAP_Y),
      })
    }

    y += rows * (CARD_H + CARD_GAP_Y) + LAYER_GAP
  }

  return positions
}

// ─── Render ──────────────────────────────────────────────────

function render(container: HTMLElement) {
  if (container.dataset.rendered === "true") return
  container.dataset.rendered = "true"

  const positions = getCardPositions()

  // Compute canvas dimensions
  let maxX = 0
  let maxY = 0
  positions.forEach((pos) => {
    maxX = Math.max(maxX, pos.x + CARD_W)
    maxY = Math.max(maxY, pos.y + CARD_H)
  })
  const width = maxX + PAD
  const height = maxY + PAD + 80 // space for legend + stats

  // Canvas setup
  const canvas = document.createElement("canvas")
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.ceil(width * dpr)
  canvas.height = Math.ceil(height * dpr)
  canvas.style.width = "100%"
  canvas.style.maxWidth = `${width}px`
  canvas.style.height = "auto"
  canvas.style.display = "block"
  canvas.style.margin = "2rem auto"
  canvas.style.cursor = "default"
  canvas.setAttribute("role", "img")
  canvas.setAttribute("aria-label",
    "Interactive map of the Anthropic product ecosystem organized in three layers: Direct Products, Platform, and Programs. " +
    "Filled cards indicate products Gene currently uses; hollow cards indicate available but unused products."
  )
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.scale(dpr, dpr)

  // Tooltip element (safe DOM construction, no innerHTML)
  const tooltip = document.createElement("div")
  tooltip.style.position = "absolute"
  tooltip.style.display = "none"
  tooltip.style.background = PARCHMENT
  tooltip.style.border = `2px solid ${INK}`
  tooltip.style.padding = "8px 12px"
  tooltip.style.fontFamily = "'IM Fell English', Georgia, serif"
  tooltip.style.fontSize = "13px"
  tooltip.style.color = INK
  tooltip.style.maxWidth = "260px"
  tooltip.style.lineHeight = "1.4"
  tooltip.style.pointerEvents = "none"
  tooltip.style.zIndex = "100"
  tooltip.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.15)"

  const tooltipTitle = document.createElement("strong")
  tooltipTitle.style.color = WFRP_RED
  const tooltipDesc = document.createElement("span")
  tooltip.appendChild(tooltipTitle)
  tooltip.appendChild(document.createElement("br"))
  tooltip.appendChild(tooltipDesc)

  // Wrap canvas for tooltip positioning
  const wrapper = document.createElement("div")
  wrapper.style.position = "relative"
  wrapper.style.display = "inline-block"
  wrapper.style.width = "100%"
  wrapper.style.maxWidth = `${width}px`
  wrapper.style.margin = "0 auto"
  wrapper.appendChild(canvas)
  wrapper.appendChild(tooltip)
  container.appendChild(wrapper)

  // Stats
  const usedCount = PRODUCTS.filter((p) => p.uses).length
  const totalCount = PRODUCTS.length
  const pct = Math.round((usedCount / totalCount) * 100)

  function drawAll(hoveredProduct: string | null) {
    ctx.clearRect(0, 0, width, height)

    // Parchment background
    ctx.fillStyle = PARCHMENT
    ctx.fillRect(0, 0, width, height)

    // Title
    const titleFont = "italic 18px 'IM Fell English', Georgia, serif"
    ctx.font = titleFont
    ctx.fillStyle = INK
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.fillText("The Anthropic Ecosystem", PAD, PAD)

    // Subtitle
    const subFont = "10px 'IM Fell English', Georgia, serif"
    ctx.fillStyle = SEPIA
    drawSmallCaps(ctx,
      `${usedCount} of ${totalCount} products in use (${pct}%)  \u00b7  filled = active  \u00b7  hollow = available`,
      PAD, PAD + 24, subFont, "1px"
    )

    // Connection lines (draw before cards so they go behind)
    ctx.strokeStyle = RULE
    ctx.lineWidth = 1
    ctx.setLineDash([3, 4])
    for (const p of PRODUCTS) {
      if (!p.connects) continue
      const from = positions.get(p.name)
      if (!from) continue
      for (const targetName of p.connects) {
        const to = positions.get(targetName)
        if (!to) continue
        ctx.beginPath()
        ctx.moveTo(from.x + CARD_W / 2, from.y + CARD_H / 2)
        ctx.lineTo(to.x + CARD_W / 2, to.y + CARD_H / 2)
        ctx.stroke()
      }
    }
    ctx.setLineDash([])

    // Layer labels
    let layerY = PAD + 50
    for (let layer = 1; layer <= 3; layer++) {
      const prods = getLayerProducts(layer as 1 | 2 | 3)
      const cols = Math.min(prods.length, layer === 1 ? 5 : layer === 2 ? 5 : 3)
      const rows = Math.ceil(prods.length / cols)

      // Layer label
      const labelFont = "13px 'IM Fell English', Georgia, serif"
      ctx.fillStyle = WFRP_RED
      ctx.textBaseline = "top"
      drawSmallCaps(ctx, LAYER_LABELS[layer - 1], PAD, layerY, labelFont, "1.5px")

      // Measure the small-caps label to position sublabel
      ctx.font = labelFont
      const labelW = ctx.measureText(LAYER_LABELS[layer - 1].toUpperCase()).width

      const sublabelFont = "italic 11px 'IM Fell English', Georgia, serif"
      ctx.font = sublabelFont
      ctx.fillStyle = SEPIA
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText(LAYER_SUBLABELS[layer - 1], PAD + labelW + 14, layerY + 1)

      // Separator line
      ctx.strokeStyle = WFRP_RED
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(PAD, layerY + 18)
      ctx.lineTo(width - PAD, layerY + 18)
      ctx.stroke()

      layerY += 32
      layerY += rows * (CARD_H + CARD_GAP_Y) + LAYER_GAP
    }

    // Cards
    const cardFont = "bold 11px 'IM Fell English', Georgia, serif"
    const statusFont = "italic 9px 'IM Fell English', Georgia, serif"

    for (const p of PRODUCTS) {
      const pos = positions.get(p.name)
      if (!pos) continue
      const isHovered = p.name === hoveredProduct
      const x = pos.x
      const y = pos.y

      if (p.uses) {
        // Filled card
        ctx.fillStyle = isHovered ? INK : "#2a1d0d"
        ctx.fillRect(x, y, CARD_W, CARD_H)

        // Name
        ctx.font = cardFont
        ctx.fillStyle = PARCHMENT
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(p.short, x + CARD_W / 2, y + CARD_H / 2 - 6)

        // Status
        ctx.font = statusFont
        ctx.fillStyle = AMBER
        ctx.fillText("active", x + CARD_W / 2, y + CARD_H / 2 + 10)
      } else {
        // Hollow card
        ctx.fillStyle = isHovered ? "#f5edd5" : PARCHMENT
        ctx.fillRect(x, y, CARD_W, CARD_H)
        ctx.strokeStyle = isHovered ? INK : SEPIA
        ctx.lineWidth = isHovered ? 2 : 1
        ctx.strokeRect(x + 0.5, y + 0.5, CARD_W - 1, CARD_H - 1)

        // Name
        ctx.font = cardFont
        ctx.fillStyle = isHovered ? INK : SEPIA
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(p.short, x + CARD_W / 2, y + CARD_H / 2 - 6)

        // Status
        ctx.font = statusFont
        ctx.fillStyle = isHovered ? WFRP_RED : RULE
        ctx.fillText("available", x + CARD_W / 2, y + CARD_H / 2 + 10)
      }
    }

    // Coverage bar at bottom
    const barY = maxY + PAD + 20
    const barWidth = width - PAD * 2
    const barHeight = 16

    // Background
    ctx.fillStyle = "#e0d8c0"
    ctx.fillRect(PAD, barY, barWidth, barHeight)

    // Fill
    const fillWidth = (usedCount / totalCount) * barWidth
    ctx.fillStyle = GREEN_INK
    ctx.fillRect(PAD, barY, fillWidth, barHeight)

    // Border
    ctx.strokeStyle = INK
    ctx.lineWidth = 1
    ctx.strokeRect(PAD, barY, barWidth, barHeight)

    // Label
    ctx.font = "italic 11px 'IM Fell English', Georgia, serif"
    ctx.fillStyle = INK
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.fillText(
      `Ecosystem coverage: ${usedCount}/${totalCount} products (${pct}%)`,
      PAD, barY + barHeight + 6,
    )
  }

  // Initial draw
  drawAll(null)

  // Mouse interaction
  function getProductAtPoint(clientX: number, clientY: number): Product | null {
    const rect = canvas.getBoundingClientRect()
    const scaleX = width / rect.width
    const mx = (clientX - rect.left) * scaleX
    const my = (clientY - rect.top) * scaleX

    for (const p of PRODUCTS) {
      const pos = positions.get(p.name)
      if (!pos) continue
      if (mx >= pos.x && mx <= pos.x + CARD_W && my >= pos.y && my <= pos.y + CARD_H) {
        return p
      }
    }
    return null
  }

  let currentHover: string | null = null

  canvas.addEventListener("mousemove", (e) => {
    const product = getProductAtPoint(e.clientX, e.clientY)
    const newHover = product?.name ?? null

    if (newHover !== currentHover) {
      currentHover = newHover
      drawAll(currentHover)

      if (product) {
        canvas.style.cursor = "pointer"
        tooltip.style.display = "block"
        tooltipTitle.textContent = product.name
        tooltipDesc.textContent = product.desc
        // Position tooltip
        const rect = canvas.getBoundingClientRect()
        const pos = positions.get(product.name)!
        const scaleX = rect.width / width
        tooltip.style.left = `${pos.x * scaleX + CARD_W * scaleX / 2}px`
        tooltip.style.top = `${(pos.y + CARD_H + 6) * scaleX}px`
      } else {
        canvas.style.cursor = "default"
        tooltip.style.display = "none"
      }
    }
  })

  canvas.addEventListener("mouseleave", () => {
    currentHover = null
    drawAll(null)
    tooltip.style.display = "none"
    canvas.style.cursor = "default"
  })
}

// ─── Mount ───────────────────────────────────────────────────

document.addEventListener("nav", () => {
  const containers = document.querySelectorAll<HTMLElement>(".ecosystem-map")
  containers.forEach(render)
})
