// Sigma build is quite big and not friendly for webpack, therefore we use custom import

// Core:
import "sigma/src/sigma.core.js"

// Utils:
import "sigma/src/conrad.js"
import "sigma/src/utils/sigma.utils.js"
import "sigma/src/utils/sigma.polyfills.js"

// Main classes:
import "sigma/src/sigma.settings.js"
import "sigma/src/classes/sigma.classes.dispatcher.js"
import "sigma/src/classes/sigma.classes.configurable.js"
import "sigma/src/classes/sigma.classes.graph.js"
import "sigma/src/classes/sigma.classes.camera.js"
import "sigma/src/classes/sigma.classes.quad.js"
import "sigma/src/classes/sigma.classes.edgequad.js"

// Captors:
import "sigma/src/captors/sigma.captors.mouse.js"
import "sigma/src/captors/sigma.captors.touch.js"

// Renderers:
import "sigma/src/renderers/sigma.renderers.canvas.js"

// Sub functions per engine:
import "sigma/src/renderers/canvas/sigma.canvas.labels.def.js"
import "sigma/src/renderers/canvas/sigma.canvas.hovers.def.js"
import "sigma/src/renderers/canvas/sigma.canvas.nodes.def.js"
import "sigma/src/renderers/canvas/sigma.canvas.edges.def.js"
import "sigma/src/renderers/canvas/sigma.canvas.edges.curve.js"
import "sigma/src/renderers/canvas/sigma.canvas.edges.arrow.js"
import "sigma/src/renderers/canvas/sigma.canvas.edges.curvedArrow.js"
import "sigma/src/renderers/canvas/sigma.canvas.edgehovers.def.js"
import "sigma/src/renderers/canvas/sigma.canvas.edgehovers.curve.js"
import "sigma/src/renderers/canvas/sigma.canvas.edgehovers.arrow.js"
import "sigma/src/renderers/canvas/sigma.canvas.edgehovers.curvedArrow.js"
import "sigma/src/renderers/canvas/sigma.canvas.extremities.def.js"

// Middlewares:
import "sigma/src/middlewares/sigma.middlewares.rescale.js"
import "sigma/src/middlewares/sigma.middlewares.copy.js"

// Miscellaneous:
import "sigma/src/misc/sigma.misc.animation.js"
import "sigma/src/misc/sigma.misc.bindEvents.js"
import "sigma/src/misc/sigma.misc.bindDOMEvents.js"
import "sigma/src/misc/sigma.misc.drawHovers.js"

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