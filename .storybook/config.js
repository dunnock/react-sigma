import { configure, setAddon } from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'
import { setOptions } from '@kadira/storybook-addon-options'

setOptions({
  name: 'REACT-SIGMA GITHUB',
  url: 'https://github.com/dunnock/react-sigma',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
})

setAddon(infoAddon)

configure(() => require('../stories-src'), module)
