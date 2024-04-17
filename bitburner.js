import { wrap } from 'wrap.js'

/** @param {NS} ns */
export async function main(ns) {
  const argList = [1000];
  let res = await wrap(ns.read('compute.js'), 'calcResult', argList);
  // let res = calcResult(...argList);
  ns.tprint(res);
}
