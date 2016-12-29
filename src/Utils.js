	export function propsChanged(prev: Object, next: Object) {
		for(let key in prev)
			if(prev[key] !== next[key])
				return true
		return false
	}
