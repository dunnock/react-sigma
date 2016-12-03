// @flow

const palette = ["#5DA5DA","#60BD68","#B2912F","#F15854","#DECF3F","#FAA43A","#B276B2","#F17CB0","#4D4D4D"]

/*
	Default node and edge transformation for NeoCypher,
	class has 2 functions: node() and edge() which transform data from Neo4j format into Sigma.

	Also it iterates colors assignments from palette based on node.label and edge.type.
*/

class NeoGraphItemsProducers {
	_currentColor: number;
	_colorsMap: Object;
	constructor() {
			this._currentColor = 0
			this._colorsMap = {}
	}
	node(node: Neo4j$Node): Sigma$Node {
		return {
			id : node.id,
			label : node.properties.name,
			x : Math.random(),
			y : Math.random(),
			size : 1,
			color : this.colorsMap(node.labels[0]),
			neo4j_labels : node.labels,
			neo4j_data : node.properties
		}
	}
	edge(edge: Neo4j$Edge): Sigma$Edge {
		return {
			id : edge.id,
			label : edge.type,
			source : edge.startNode,
			target : edge.endNode,
			color : this.colorsMap(edge.type),
			neo4j_type : edge.type,
			neo4j_data : edge.properties
		}
	}
	colorsMap(label: ?string): string {
		let color = this._colorsMap[label];
		if(!color) {
			color = palette[this._currentColor++ % palette.length]
			this._colorsMap[label] = color
		}
		return color
	}
}

export default NeoGraphItemsProducers;
