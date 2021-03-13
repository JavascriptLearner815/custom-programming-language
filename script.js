// Helped by https://stackoverflow.com/a/66191686/13900902

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
  `;
 
  const consoleRegExp = /(?:^|\s+)console:?\s+\\?"(.+?)\\?";?/gim;
  const globalVarRegExp = /(?:^|\s+)globalvar:?\s+\\?"(.+?)\\?",?\s?(?:is:?|:|=)\s?\\?"(.+?)\\?"+;?/gim;
  const globalVarNoValRegExp = /(?:^|\s+)globalvar:?\s+\\?"(.+?)\\?",?\s+noval+;?/gim;
  const getVarAndConsoleRegExp = /(?:^|\s+)getvarandconsole:?\s+\\?"(.+?)\\?";?/gim;
  const commentRegExp = /(?:^|\s+):\s?([^:]*);?/gim;
  
  btn.addEventListener("click", () => {
    const { value } = code;
  
    [...value.matchAll(consoleRegExp)].forEach(m => console.log(m[1]));
    [...value.matchAll(globalVarRegExp)].forEach(m => globalVariables[m[1]] = m[2]);
    [...value.matchAll(globalVarNoValRegExp)].forEach(m => globalVariables[m[1]] = null);
    [...value.matchAll(getVarAndConsoleRegExp)].forEach(m => console.log(globalVariables[m[1]] ?? "Unspecified"));
    [...value.matchAll(commentRegExp)].forEach(m => {
      ;
    });
    
    setTimeout(() => {
      alert("Code executed; remember to check your console (Ctrl+Shift+I or Command+Shift+I, then press \"Console\")!");
    });
  });

})();
