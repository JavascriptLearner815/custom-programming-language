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
  console Use this hack to add comments! Invalid arguments like this will be ignored and won't throw an error, as well.
  globalvar "hellothere" is "Some text"
  globalvar "nothing" noval
  getvarandconsole "hellothere"
  getvarandconsole "nothing"
  `;
 
  const consoleRegex = /(?:^|\s+)console:?\s+\\?"(.+?)\\?";?/gim;
  const globalVarRegex = /(?:^|\s+)globalvar:?\s+\\?"(.+?)\\?",?\s?(?:is:?|:|=)\s?\\?"(.+?)\\?"+;?/gim;
  const globalVarNoValRegex = /(?:^|\s+)globalvar:?\s+\\?"(.+?)\\?",?\s+noval+;?/gim;
  const getVarAndConsoleRegex = /(?:^|\s+)getvarandconsole:?\s+\\?"(.+?)\\?";?/gim;
  
  btn.addEventListener("click", () => {
    const { value } = code;
  
    [...value.matchAll(consoleRegex)].forEach(m => console.log(m[1]));
    [...value.matchAll(globalVarRegex)].forEach(m => globalVariables[m[1]] = m[2]);
    [...value.matchAll(globalVarNoValRegex)].forEach(m => globalVariables[m[1]] = null);
    [...value.matchAll(getVarAndConsoleRegex)].forEach(m => console.log(globalVariables[m[1]] ?? "Unspecified"));
    
    setTimeout(() => {
      alert("Code executed; remember to check your console (Ctrl+Shift+I or Command+Shift+I)!");
    });
  });

})();
