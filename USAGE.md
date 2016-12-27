## Install

```
yarn add react-sigma
```

Any of the following components can be imported

```
import {Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2,
        RelativeSize, NOverlap, NeoCypher, NeoGraphItemsProducers,
        RandomizeNodePositions, SigmaEnableWebGL} from 'react-sigma'
```

Dagre and ForceLink are not included intentionally in the default distribution
should be imported explicitly:

```
import ForceLink from 'react-sigma/lib/ForceLink'
import Dagre from 'react-sigma/lib/Dagre'
```

## Minimizing bundle

### webpack1

Minimized sigma with minimum required functionality is 76kb, more when plugins added.
Minimized bundle with all components (except Dagre and ForceLink) is 186kb.
Webpack1 does not support tree shaking and require explicit submodules import
to bundle only what's been used, e.g.:
```
import Sigma from 'react-sigma/lib/Sigma'
import LoadJSON from 'react-sigma/lib/LoadJSON'
```

### webpack2

Using webpack2 or rollup

```
import * as Sigma from 'react-sigma'
```

unused components won't be included in the resulting bundle.
