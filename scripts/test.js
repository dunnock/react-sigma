process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

const jest = require('jest');
const argv = process.argv.slice(2);

// Watch unless on CI
if (!process.env.CI) {
  argv.push('--watch');
}


jest.run(argv);
