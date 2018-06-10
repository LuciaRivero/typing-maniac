require.cache = Object.create(null);

function readFile(requestedFile){
  const xhr = new XMLHttpRequest();
  const urlBuilder = {
    protocol: window.location.protocol,
    host: window.location.host,
    separator: `/`
  };

  const endPoint = urlBuilder.protocol +
                   urlBuilder.separator +
                   urlBuilder.separator +
                   urlBuilder.host +
                   urlBuilder.separator +
                   "js" +
                   urlBuilder.separator;

  xhr.open('GET', endPoint + requestedFile, false);
  xhr.send();
  return xhr.responseText;
}

/* tomado de https://eloquentjavascript.net/10_modules.html */
function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let module = { exports: {} };

    require.cache[name] = module;

    let wrapper = Function("require, exports, module", code);

    wrapper(require, module.exports, module);
  }

  return require.cache[name].exports;
}
