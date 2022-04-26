import express from "express";
import job from "./job";
import read from "./read";
const app = express();

// start listening after job starts
async function main() {
  await job.start();
  const port = process.env.PORT || 18123;
  app.listen(port, () => {
    console.log(`app live on http://localhost:${port}`);
  });
}

// get data/cities.json when / is requested
app.get("/", async (req, res) => {
  const data = await read();
  res.send(data);
});

main();
