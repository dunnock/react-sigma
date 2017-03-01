// @flow
export function propsChanged(prev: Object, next: Object) {
	for(let key in prev)
		if(prev[key] !== next[key])
			return true
	return false
}

export function sigmaGraphMerge(graph: Sigma$Graph$Data) {
	graph.nodes.forEach(node => {
		if(!this.nodesIndex[node.id])
			this.addNode(node)
	});
	graph.edges.forEach(edge => {
		if(!this.edgesIndex[edge.id])
			this.addEdge(edge)
	});
}
