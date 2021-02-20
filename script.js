(() => {
  const code = document.querySelector("#code");
  const btn = document.querySelector("#run");
  
  code.value = `
  console "Hello, world!"
  console
  "I still work!"
  Invalid operations like this won't throw an error.
  `;
 
  const regex = /(?:^|\s+)console\s+\\?"(.+?)\\?"/gm;
  
  btn.addEventListener("click", () => {
    const { value } = code;
  
    [...value.matchAll(regex)].forEach(m => console.log(m[1]));
  
  });

})();
