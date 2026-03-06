/* Memory variable */
let M = null;

/* Tracks whether the trailing 0 after '.' is a placeholder */
let decimalPlaceholderActive = false;

function getDisplay() {
  return document.getElementById('inputTextField');
}

/* ---- 1. Append numbers & operators to the display ---- */
function appendSymbol(symbol) {
  const display = getDisplay();

  /* If a decimal placeholder '0' is active and user types a digit,
     replace the placeholder 0 with the typed digit */
  if (decimalPlaceholderActive && /\d/.test(symbol) && display.value.endsWith('.0')) {
    display.value = display.value.slice(0, -1) + symbol;
    decimalPlaceholderActive = false;
    return;
  }

  /* Any operator key clears the placeholder flag */
  if (!/\d/.test(symbol)) {
    decimalPlaceholderActive = false;
  }

  display.value += symbol;
}

/* ---- 2. Decimal button – appends '.0' ---- */
function appendDecimal() {
  const display = getDisplay();
  const value = display.value;

  /* Get the last operand (split on operators) */
  const lastPart = value.split(/[\+\-\*\/]/).pop();

  /* If the field is empty or the last character is an operator, prepend 0 */
  if (value === '' || /[\+\-\*\/]$/.test(value)) {
    display.value += '0.0';
    decimalPlaceholderActive = true;
    return;
  }

  /* Only add decimal if the current operand doesn't already have one */
  if (!lastPart.includes('.')) {
    display.value += '.0';
    decimalPlaceholderActive = true;
  }
}

/* ---- 3. Equals – evaluate the expression ---- */
function calculateResult() {
  const display = getDisplay();
  try {
    if (display.value.trim() === '') return;
    const result = eval(display.value);
    if (Number.isFinite(result)) {
      display.value = result;
    } else {
      display.value = 'Error';
    }
  } catch (e) {
    display.value = 'Error';
  }
  decimalPlaceholderActive = false;
}

/* ---- 4. Clear – reset display (memory is only cleared by MC) ---- */
function clearAll() {
  getDisplay().value = '';
  decimalPlaceholderActive = false;
}

/* Helper: return a number only if the display holds a pure numeric value */
function readNumber() {
  const text = getDisplay().value.trim();
  if (text === '') return null;
  if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(text)) {
    return Number(text);
  }
  return null;
}

/* Helper: evaluate the display (number or expression) and return numeric result */
function readNumberOrExpression() {
  const number = readNumber();
  if (number !== null) return number;
  const text = getDisplay().value.trim();
  if (text === '') return null;
  try {
    const result = eval(text);
    if (Number.isFinite(result)) return result;
  } catch (e) {}
  return null;
}

/* ---- 5. 1/x – reciprocal ---- */
function oneByX() {
  const n = readNumberOrExpression();
  if (n === null || n === 0) {
    getDisplay().value = 'Error';
    decimalPlaceholderActive = false;
    return;
  }
  getDisplay().value = parseFloat((1 / n).toFixed(2));
  decimalPlaceholderActive = false;
}

/* ---- 6. x2 – square ---- */
function squareValue() {
  const n = readNumberOrExpression();
  if (n === null) {
    getDisplay().value = 'Error';
    decimalPlaceholderActive = false;
    return;
  }
  getDisplay().value = n * n;
  decimalPlaceholderActive = false;
}

/* ---- 7. √ – square root ---- */
function squareRoot() {
  const n = readNumberOrExpression();
  if (n === null || n < 0) {
    getDisplay().value = 'Error';
    decimalPlaceholderActive = false;
    return;
  }
  getDisplay().value = Math.sqrt(n);
  decimalPlaceholderActive = false;
}

/* ---- 8. ± – toggle sign ---- */
function toggleSign() {
  const display = getDisplay();
  const text = display.value.trim();
  if (text === '') return;

  /* If the display holds a pure number, negate it */
  const n = readNumber();
  if (n !== null) {
    display.value = String(-n);
    decimalPlaceholderActive = false;
    return;
  }
}

/* ---- 9. MS – store numeric value only (not equations) ---- */
function memoryStore() {
  const n = readNumber();
  if (n !== null) M = n;
}

/* ---- 10. MC – clear stored value ---- */
function memoryClear() {
  M = null;
}

/* ---- 11. MR – recall stored value ---- */
function memoryRecall() {
  if (M !== null) {
    getDisplay().value = M;
    decimalPlaceholderActive = false;
  }
}

/* ---- 12. M+ – add display value to memory ---- */
function memoryAdd() {
  const n = readNumber();
  if (n === null) return;
  if (M === null) M = 0;
  M += n;
}
