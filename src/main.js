#!/usr/bin/env node
import {commandFactor} from "./command/index.js";

(async function() {
  try {
    await commandFactor(process.argv).run();
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})()
