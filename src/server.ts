import { app } from './app';
import { setupDB } from './utils/db-setup';

setupDB();

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
