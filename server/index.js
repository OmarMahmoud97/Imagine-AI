// Allow user input from terminal
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function doTranslationLoop() {
  rl.question("Press any key to translate or 'q' to quit: ", (answer) => {
    if (answer.toLowerCase() === "q") {
      rl.close();
    } else {
      translateFromMicrophone();
    }
  });
}
