import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);
app.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
app.use(router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
