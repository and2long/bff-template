import { app } from "./app";
import { setupDB } from "./utils/db-setup";

setupDB();

const port = process.env.API_PORT || 3000;

// 处理 /favicon.ico 请求
app.get("/favicon.ico", (req, res) => {
  // 这里可以返回你的图标文件，或者返回一个默认的图标
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
