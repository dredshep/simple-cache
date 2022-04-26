import fs from "fs-extra";

export default async function read() {
  try {
    const data = await fs.readFile("./data/cities.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return null;
  }
}
