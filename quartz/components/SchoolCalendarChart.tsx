// @ts-ignore
import script from "./scripts/schoolCalendarChart.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Carrier component for the school calendar chart script.
// Renders nothing on the server — the chart container lives in
// the markdown source as a raw <div class="school-calendar-chart">.
// This component exists solely to thread the inline script through
// Quartz's esbuild pipeline and register it as afterDOMLoaded.
const SchoolCalendarChart: QuartzComponent = () => null

SchoolCalendarChart.afterDOMLoaded = script

export default (() => SchoolCalendarChart) satisfies QuartzComponentConstructor
