import React from 'react'

export function embedProps(elements: mixed, extraProps) {
        return React.Children.map(elements, 
            (element) => React.cloneElement(element, extraProps))
    }
