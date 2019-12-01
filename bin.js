#!/usr/bin/env node

const { main } = require("./index.js");
main(parseInt(process.argv.pop()) || 80);
