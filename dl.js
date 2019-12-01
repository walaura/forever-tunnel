#!/usr/bin/env node

const { read } = require("./index.js");
const fs = require("fs");
const path = require("path");

const main = async () => {
  const filepath = path.join(process.cwd(), process.argv.pop());
  const file = await read();
  fs.writeFileSync(filepath, JSON.stringify(file));
  console.log("written " + filepath);
};

main();
