/* Receives text of normal JS code (or an entire module). 

   Prepends onmessage handler for Worker API.
   Removes 'export' keyword (not allowed in Worker).

   TODO: remove default export declaration.
*/

export function wrap(module_txt, func_name, argList) {

  return new Promise((resolve, reject) => {

    /* convert normal module:
       - onmessage handler
       - remove 'export' keywords
    */
    const worker_code_txt = `
onmessage = function (event) {
  postMessage(${func_name}(...event.data));
}
` + module_txt.replaceAll(/^export /g, ''); // "export function" -> "function"

    const blob = new Blob([worker_code_txt], { type: "text/javascript" });
    const worker = new Worker(window.URL.createObjectURL(blob));
    worker.onmessage = e => (resolve(e.data), worker.terminate());
    worker.onerror = e => (reject(e.message), worker.terminate());
    worker.postMessage(argList);
  });
}
