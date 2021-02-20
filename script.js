(() => {
  const code = document.querySelector("#code");
  const btn = document.querySelector("#run");
  
  code.value = `
  console "Hello, world!"
  console
  "I still work!"
  jaisphpunipophao console
  "I yet still work!"
  console Invalid operations followed by valid operations will execute the valid operations!
  Invalid operations like this will be ignored and won't throw an error.
  console Use this hack to add comments! Invalid parameters like this will be ignored and won't throw an error, as well.
  `;
 
  const consoleRegex = /(?:^|\s+)console\s+\\?"(.+?)\\?"/gm;
  
  btn.addEventListener("click", () => {
    const { value } = code;
  
    [...value.matchAll(consoleRegex)].forEach(m => console.log(m[1]));
  
  });

})();