function convertIntegerToBinary(x) {
  let bin = 0;
  let rem, i = 1;
  while (x != 0) {
    rem = x % 2;
    x = parseInt(x / 2);
    bin = bin + rem * i;
    i = i * 10;
  }
  return bin;
}

function convertDecimalToBinary(x) {
  const binary = [];
  while (x != 1.0) {
    binary.push(Math.floor(x));
    let resto = x % 1;
    x = resto * 2;
    console.log(x)
  }
  binary.push(1);
  binary.shift();
  return binary.join("");
}

function firstBite(number) {
  if (number >= 0) {
    return "0";
  } else {
    return "1";
  }
}

function standardIEEE() {
  let standard = "________________________________";
  let number = prompt("Enter a decimal number: ");
  // Sign
  standard = [standard.slice(0, 0), firstBite(number), standard.slice(0)].join('');
  // Exponent
  // Mantissa
  // conversão inteira
  let integerBinary = convertIntegerToBinary(Math.floor(number));
  // conversão decimal
  let decimalBinary = false;
  if (number % 1 > 0) {
    decimalBinary = convertDecimalToBinary(number % 1);
  }
  console.log(integerBinary, ",", decimalBinary);
  console.log(standard);
}

standardIEEE();
