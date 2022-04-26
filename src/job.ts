// the task is to, every 2 minutes, retrieve information from world cities api and save it as a json file

import fs from "fs-extra";
import axios from "axios";
import cron from "cron";

async function getCities() {
  const url =
    "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function job() {
  const data = await getCities();

  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] writing data to file`);

  await fs.ensureFile("./data/cities.json");
  await fs.writeFile("./data/cities.json", JSON.stringify(data));

  return true;
}

job.start = async function start() {
  const cronjob = new cron.CronJob("0 */2 * * * *", job);
  cronjob.start();
  return job();
};

export default job;
