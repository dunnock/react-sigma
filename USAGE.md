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

### webpack2

Using webpack2 or rollup

```
import { Sigma, ForceAtlas2 } from 'react-sigma'
```

unused components won't be included in the resulting bundle.
