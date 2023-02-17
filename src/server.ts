import app from './app';
import { setup } from './utils/db-setup';

setup().then(() => {
  console.log('db connect success.');
}
).catch(() => {
  console.log("db connect error.");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
