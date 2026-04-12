---
title: "The Anthropic Ecosystem in April 2026: A Power User's Field Guide"
description: "Claude is no longer just a chatbot. It's a desktop agent, a CLI tool, a Slack bot, an Excel add-in, a protocol layer, and a plugin marketplace. Here's the full map — what exists, what's good, and what I actually use every day."
date: 2026-04-06
tags:
  - claude
  - anthropic
  - tools
  - AI
  - field-guide
---

# The Anthropic Ecosystem in April 2026

> *A field guide from someone who uses Claude Code 8+ hours a day, has 85 custom skills installed, and just discovered he's still missing half the features.*

---

## The Map

<div class="ecosystem-map"></div>

Six months ago, "using Claude" meant talking to a chatbot. Today, Anthropic ships a desktop agent that controls your screen, a CLI tool that writes and commits code, Office add-ins for Excel and PowerPoint, a Slack integration, a mobile dispatch system, and a protocol layer (MCP) that lets Claude talk to any external service. Oh, and a plugin marketplace.

It's a lot. Here's how it all fits together.

---

## Layer 1: The Products You Touch

### Claude.ai — The Chat Interface
The one everyone knows. Web and mobile. Conversations, artifacts, file uploads. Still the front door for most people.

### Claude Code — The CLI
This is where I live. A terminal tool that reads your codebase, writes code, runs tests, commits, and manages its own context window. Think of it as an agent that happens to live in your terminal.

What makes it interesting is the extension layer on top:
- **Skills** — reusable knowledge and workflows (I have 85+)
- **Plugins** — bundled capability packages from a marketplace
- **MCP Servers** — connections to external services (Slack, Google Workspace, databases)
- **Hooks** — deterministic scripts that fire on events (linting after edits, safety guards)
- **Custom Agents** — specialized sub-agents with different personas and tool access
- **Auto Memory** — Claude remembers what you teach it across sessions

Claude Code also runs in the cloud at claude.ai/code. You can fire off tasks with `--remote`, review diffs in a browser, and pull results back to your terminal with `/teleport`. It can even watch a PR and auto-fix CI failures.

### Claude Cowork — The Desktop Agent
New as of early 2026. A desktop app where Claude has local file access, can control your screen (Computer Use), and completes tasks autonomously. It's Claude Code for non-developers.

### Dispatch — The Mobile Bridge
Assign Claude a task from your phone. It executes on your desktop. Start on the subway, pick up the results when you sit down. Continuous conversation across devices.

### Computer Use — GUI Automation
Claude can open apps, click buttons, fill forms, and take screenshots. Research preview on macOS and Windows. You enable it per-session, and Claude asks permission before accessing each new app. Surprisingly capable for native app testing.

### Office Add-Ins
**Claude for Excel**: Query formulas, debug errors, build financial models. Ctrl+Option+C on Mac.
**Claude for PowerPoint**: Generate slides, edit layouts, create native charts (not images — editable charts). Both share a continuous conversation context.

### Claude for Slack
First-party from Anthropic. DM Claude, mention it in threads, route coding tasks to Claude Code. I haven't set this up yet but it's on the list.

---

## Layer 2: The Platform Underneath

### MCP — Model Context Protocol
The integration backbone. Every external connection Claude makes — to Slack, to a database, to a browser — runs through MCP. It's an open protocol, not a proprietary plugin format. Any developer can build an MCP server; any Claude surface can consume it.

I run six MCP servers: two Slack workspaces, Google Workspace (Gmail/Calendar/Drive), a smart display (Skylight), a VR headset (Meta Quest), and a form builder (Tally).

### Connectors
A browsable directory of MCP-powered integrations at claude.com/connectors. Financial services, healthcare, sales, data analysis — categorized by use case. Worth checking periodically for new ones.

### Plugins
Bundles of skills, hooks, and MCP servers in one-click packages. The marketplace has code review, GitHub management, Playwright automation, frontend design generation, and more. Install with `/plugin`.

### Skills — The Unifying Layer
This is the architectural insight that matters most: **a Skill runs everywhere Claude runs.** Same skill works in Claude.ai, Claude Code, Excel, PowerPoint, and the API. Encode a workflow once, use it on every surface. This is how institutional knowledge scales.

### Marketplace
Enterprise procurement play (limited preview). One Anthropic contract covers partner tools. Interesting for organizations, not individuals.

---

## Layer 3: What Power Users Should Know

### Features Most People Miss

**`/btw` — The Side Question.** Opens a dismissible overlay for quick questions that never enter your conversation history. Zero context cost. Perfect for "wait, what's that function called again?" moments without polluting your session.

**`/powerup` — Interactive Tutorials.** Animated feature demos built into the CLI. The fastest way to discover what's new without reading changelogs.

**Ultraplan — Cloud Planning with Browser Review.** Draft a plan in the cloud, review it in your browser with inline comments, then execute remotely or locally. If you already do architecture review before implementation, this is that workflow productized.

**`--remote` and `/teleport` — Cloud/Local Handoff.** Send a task to a cloud VM with `--remote`, keep working locally, then `/teleport` the results back to your terminal when they're ready. Fire and forget.

**Path-Scoped Rules.** Instead of one CLAUDE.md file that loads every session, split rules into focused files under `.claude/rules/` with YAML frontmatter specifying which file paths they apply to. Rules only load when Claude reads matching files. Massive context savings.

**`/compact focus on X` — Targeted Compaction.** When your context window fills up, instead of losing everything, tell Claude what to preserve during compaction.

---

## My Setup

For reference, here's what a mature Claude Code installation looks like after four months of daily use:

| Component | Count |
|-----------|-------|
| Active plugins | 12 |
| MCP servers | 6 |
| Custom agents | 6 (including expert personas for 3D/WebGPU consulting) |
| Skills | 85+ (CNBC operations, trading, browser automation, knowledge management) |
| Slash commands | 17 (daily briefing, session wrap, design evaluation, email triage) |
| Hooks | 5 (mindfulness prompt, email safety guard, Chrome DB guard) |
| Nightly LaunchAgents | 5 (memory consolidation, cross-referencing, overnight research) |

Total ecosystem footprint: roughly 41 GB across projects, archives, tools, and plugins.

Is this typical? No. Is it necessary? Also no. You can start with `claude` in a terminal and build up from there. But the ceiling is high for people who want to push it.

---

## What I'm Adding Next

1. **Cowork + Dispatch** — Desktop agent for non-code tasks, mobile dispatch for on-the-go
2. **Computer Use** — GUI automation for native app testing
3. **Claude for Slack** — Integration with work Slack
4. **Ultraplan** — Cloud planning for architecture reviews
5. **Path-scoped rules** — Reduce context noise in multi-project setup
6. **Auto-fix PRs** — Let Claude watch PRs and fix CI failures
7. **`.worktreeinclude`** — Auto-copy env files to git worktrees for parallel sessions

---

## The Honest Assessment

Anthropic is building a platform, not just a model. The breadth is impressive — I didn't know half of this existed until I audited it today. The unifying thread is MCP as the integration protocol and Skills as the cross-surface capability format. If those two abstractions hold, the ecosystem compounds nicely.

The rough edges: credentials management (my MCP config has tokens in plaintext), feature discoverability (I've been a daily user for months and just learned about `/btw`), and the gap between "exists" and "is reliable" for newer features like Computer Use and Dispatch.

But the core loop — Claude Code in a terminal, reading your code, writing changes, running tests, managing its own context — is genuinely the best developer tool I've used. Everything else is an expanding surface area on top of that foundation.

---

*This is a living document. I'll update it as I adopt more of the ecosystem. Last audited: April 6, 2026.*

*Built with Claude Code (obviously). The full private reference with my complete setup inventory lives in my Obsidian vault.*
