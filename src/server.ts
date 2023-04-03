import { app } from "./app";
import { setupDB } from "./utils/db-setup";

setupDB();

const port = process.env.API_PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
