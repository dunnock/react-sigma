import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories-src');
}

configure(loadStories, module);
