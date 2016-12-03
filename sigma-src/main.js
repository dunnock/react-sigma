// Sigma build is quite big and not friendly for webpack, therefore we use custom import

// Core:
import "sigma-react/src/sigma.core.js"

// Utils:
import "sigma-react/src/conrad.js"
import "sigma-react/src/utils/sigma.utils.js"
import "sigma-react/src/utils/sigma.polyfills.js"

// Main classes:
import "sigma-react/src/sigma.settings.js"
import "sigma-react/src/classes/sigma.classes.dispatcher.js"
import "sigma-react/src/classes/sigma.classes.configurable.js"
import "sigma-react/src/classes/sigma.classes.graph.js"
import "sigma-react/src/classes/sigma.classes.camera.js"
import "sigma-react/src/classes/sigma.classes.quad.js"
import "sigma-react/src/classes/sigma.classes.edgequad.js"

// Captors:
import "sigma-react/src/captors/sigma.captors.mouse.js"
import "sigma-react/src/captors/sigma.captors.touch.js"

// Renderers:
import "sigma-react/src/renderers/sigma.renderers.canvas.js"

// Sub functions per engine:
import "sigma-react/src/renderers/canvas/sigma.canvas.labels.def.js"
import "sigma-react/src/renderers/canvas/sigma.canvas.hovers.def.js"
import "sigma-react/src/renderers/canvas/sigma.canvas.nodes.def.js"
import "sigma-react/src/renderers/canvas/sigma.canvas.edges.def.js"
import "sigma-react/src/renderers/canvas/sigma.canvas.edgehovers.def.js"
import "sigma-react/src/renderers/canvas/sigma.canvas.extremities.def.js"

// Middlewares:
import "sigma-react/src/middlewares/sigma.middlewares.rescale.js"
import "sigma-react/src/middlewares/sigma.middlewares.copy.js"

// Miscellaneous:
import "sigma-react/src/misc/sigma.misc.animation.js"
import "sigma-react/src/misc/sigma.misc.bindEvents.js"
import "sigma-react/src/misc/sigma.misc.bindDOMEvents.js"
import "sigma-react/src/misc/sigma.misc.drawHovers.js"

let sigma = window.sigma

// By default we exclude WbGL renderer from the Sigma component.
// WebGL has to be imported explicitly via <SigmaEnableWebGL /> in the global context.
sigma.renderers.def = sigma.renderers.canvas

// We do not support svg at all to reduce package size
//    'src/renderers/sigma.renderers.svg.js',
//    'src/renderers/svg/sigma.svg.utils.js',
//    'src/renderers/svg/sigma.svg.nodes.def.js',
//    'src/renderers/svg/sigma.svg.edges.def.js',
//    'src/renderers/svg/sigma.svg.edges.curve.js',
//    'src/renderers/svg/sigma.svg.labels.def.js',
//    'src/renderers/svg/sigma.svg.hovers.def.js',

export default sigma