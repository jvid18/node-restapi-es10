import '@babel/polyfill';

import app from './server';

const main = async () => {
  await app.listen(app.get('port'));
  console.log(`Server on port ${app.get('port')}`)
}

main();
