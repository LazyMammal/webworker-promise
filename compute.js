/* Module for compute heavy tasks can have any normal module code but keep in mind limitations of Worker API.

   For example, milliseconds return by performance.now() will be relative to worker thread creation time not main thread.
   Alternately, pass duration parameters in milliseconds or timestamps for Date.now()
*/

// example long running, math heavy function. this can be called directly but will likely block the UI
export function calcResult(msDelay) {
  const timeEnd = performance.now() + msDelay;
  let result = 12345;
  while (performance.now() < timeEnd) {
    result ^= Math.floor(Math.random() * Math.pow(2, 32));
  }
  return [result];
}
