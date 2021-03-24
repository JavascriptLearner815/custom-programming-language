// Helped by https://stackoverflow.com/a/66191686/13900902
// And by https://regexr.com/

(() => {
  const code = document.querySelector("#code");
  const btn = document.querySelector("#run");
  const globalVariables = {};
  
  code.value = `
  console "Hello, world!"
  console
  "I still work!"
  jaisphpunipophao console
  "I yet still work!"
  jaisphpunipophao hpausidfhbpiasoeiwconsole
  "But I don't work!"
  console Invalid operations followed by valid operations will execute the valid operations!
  Invalid operations like this will be ignored and won't throw an error.
  : Use this to add comments! :
  globalvar "hellothere" is "Some text"
  globalvar "nothing" noval
  getvarandconsole "hellothere"
  getvarandconsole "nothing"
  stop
  : This code won't run... :
  console "you're an idiot"
  `;
 
  const consoleRegExp = /(?:^|\s+)console:?\s+\\?"(.+?)\\?";?/gim; // https://regexr.com/5ogul
  const globalVarRegExp = /(?:^|\s+)globalvar:?\s+\\?"(.+?)\\?",?\s?(?:is:?|:|=)\s?\\?"(.+?)\\?"+;?/gim; // https://regexr.com/5oguo
  const globalVarNoValRegExp = /(?:^|\s+)globalvar:?\s+\\?"(.+?)\\?",?\s+noval+;?/gim; // https://regexr.com/5ogv1
  const getVarAndConsoleRegExp = /(?:^|\s+)getvarandconsole:?\s+\\?"(.+?)\\?";?/gim; // https://regexr.com/5ogv7
  const commentRegExp = /(?:^|\s+):\s?([^:]*);?/gim; // https://regexr.com/5ogva
  const stopRegExp = /(?:^|\s+)stop;?/gim; // https://regexr.com/5p839
  
  btn.addEventListener("click", () => {
    const { value } = code;
    let stopped = false;
  
    [...value.matchAll(consoleRegExp)].forEach(m => {
      if (!stopped) console.log(m[1]);
    });
    [...value.matchAll(globalVarRegExp)].forEach(m => {
      if (!stopped) globalVariables[m[1]] = m[2];
    });
    [...value.matchAll(globalVarNoValRegExp)].forEach(m => {
      if (!stopped) globalVariables[m[1]] = null;
    });
    [...value.matchAll(getVarAndConsoleRegExp)].forEach(m => {
      if (!stopped) console.log(globalVariables[m[1]] ?? "Unspecified"));
    });
    [...value.matchAll(commentRegExp)].forEach(m => {
      ;
    });
    [...value.matchAll(stopRegExp)].forEach(m => {
      stopped = true;
    });
    // The problem is that the code is not ensured to be run with the stop in the desired order. Please go tell me in Discussions if you know a fix.
    
    setTimeout(() => {
      alert("Code executed; remember to check your console (Ctrl+Shift+I or Command+Shift+I, then press \"Console\")!");
    });
  });

})();
