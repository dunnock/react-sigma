// @flow

import React from 'react';
import '../sigma/sigma.plugins.dragNodes';

type Props = {
    sigma?: sigma,
    onStartdrag?: (e: Sigma$Event) => void,
    onDrag?: (e: Sigma$Event) => void,
    onDrop?: (e: Sigma$Event) => void,
    onDragend?: (e: Sigma$Event) => void
};

/**
 *
 * DragNodes component, exposing the dragNodes plugin.
 *
 * When this plugin is active, individual nodes can be dragged around on
 * the canvas. The plugin fires various events during dragging and dropping.
 *
 * This plugin is not compatible with the WebGL renderer.
 *
 * @param {Sigma$EventHandler} onStartdrag      provide callback for "startdrag" event, fired at the beginning of the drag.
 * @param {Sigma$EventHandler} onDrag      provide callback for "drag" event, fired while the node is dragged.
 * @param {Sigma$EventHandler} onDrop      provide callback for "drop" event, fired at the end of the drag if the node has been dragged.
 * @param {Sigma$EventHandler} onDragend      provide callback for "dragend" event, fired at the end of the drag.
 *
**/

class DragNodes extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        if (this.props.sigma) {
            const dragListener = sigma.plugins.dragNodes(
                this.props.sigma,
                this.props.sigma.renderers[0]);

            DragNodes.bindHandlers(props, dragListener);
        }
    }

    render = () => null;

    static bindHandlers(handlers: Props, dragListener: any) {
        // Adapted from Sigma component
        ["startdrag", "drag", "drop", "dragend"].forEach(
            event => {
                let handler = "on" + event[0].toUpperCase() + event.substr(1);
                if (handlers[handler]) {
                    dragListener.bind(event, handlers[handler])
                }
            });
    }
}

export default DragNodes;
