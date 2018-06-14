const { parse, AST } = require('json-ast');

const $paste = document.getElementById('paste');
const $result = document.getElementById('json');
const $instructions = document.getElementById('instructions');
const $error = document.getElementById('error');

const ERROR_SYMBOL = Symbol();

function formatJSON(json_string) {
  try {
    const ast = parse(json_string, { junker: true });
    const parsed = AST.JsonNode.toJSON(ast);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return ERROR_SYMBOL;
  }
}

$paste.onpaste = (event) => {
  let raw_paste;

  if (window.clipboardData && window.clipboardData.getData) {
    raw_paste = window.clipboardData.getData('Text');
  } else if (event.clipboardData && event.clipboardData.getData) {
    raw_paste = event.clipboardData.getData('text/plain');
  }

  const result = formatJSON(raw_paste);

  if (result === ERROR_SYMBOL) {
    $result.style.display = 'none';
    $instructions.style.display = 'none';
    $error.style.display = 'block';
  } else {
    $result.style.display = 'block';
    $result.innerHTML = result;
    $instructions.style.display = 'none';
    $error.style.display = 'none';
  }

  return false; // prevent default
};