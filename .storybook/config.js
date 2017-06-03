import { configure, setAddon } from '@storybook/react'
import infoAddon from '@storybook/addon-info'
import { setOptions } from '@storybook/addon-options'

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
