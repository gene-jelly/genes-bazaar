// @ts-ignore
import script from "./scripts/ecosystemMap.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Carrier component for the Anthropic ecosystem map.
// Renders nothing on the server — the chart container lives in
// the markdown source as a raw <div class="ecosystem-map">.
const EcosystemMap: QuartzComponent = () => null

EcosystemMap.afterDOMLoaded = script

export default (() => EcosystemMap) satisfies QuartzComponentConstructor
