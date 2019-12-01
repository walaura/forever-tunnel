#!/usr/bin/env node

const { main } = require("./index.js");

const identifier = process.argv.pop();
const port = parseInt(process.argv.pop());

main({ identifier, port });
