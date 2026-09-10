const { execSync } = require('child_process');
const fs = require('fs');
try {
  const result = execSync('git show HEAD:routes.ts').toString();
  console.log("GIT STATUS:\n" + result.substring(0, 1000));
} catch (e) {
  console.log("No git access or file not found.");
}
