const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");

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
app.use("/api", router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
