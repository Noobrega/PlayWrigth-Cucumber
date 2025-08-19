const { spawn } = require('child_process');
const dotenv = require('dotenv');

// Load the appropriate .env file based on the ENV variable
const envFile = `.env.${process.env.ENV || 'dev'}`;
dotenv.config({ path: envFile });

const args = process.argv.slice(2); // Take the arguments passed by terminal
const env = { ...process.env, FORCE_COLOR: '3' };

let tagArgs = ['--tags', 'not @skip']

/*
To run using tags we have to make like npm test -- --tags "@Access"
Example: npm test -- --tags "@WCT @HIQ"

If we don't needed the tags just using the normal npm test

For retry follow the same template
--retry Quantity
Example: npm test -- --retry 5

We can use just one or more arguments
Example: npm test -- --tags "@Access" --retry 4
*/

const tagIndex = args.findIndex(arg => arg === '--tags')
if (tagIndex !== -1 && args[tagIndex + 1]) {
  tagArgs = ['--tags', `not @skip and ${args[tagIndex + 1]}`] // mix the tags
}

let retry = 1
const retryIndex = args.findIndex(arg => arg === '--retry')
if (retryIndex !== -1 && args[retryIndex + 1]) {
  retry = args[retryIndex + 1] // take how many tries 
}


let workers = 5
const workersIndex = args.findIndex(arg => arg === '--workers')
if (workersIndex !== -1 && args[workersIndex + 1]) {
  workers = args[workersIndex + 1] // take how many workers
}

const dryRun = spawn('cucumber-js', [
  '--dry-run',
  ...tagArgs,
  '--import', 'hooks.js',
  '--import', 'step_definitions/Steps.mjs'
], { stdio: 'pipe', env })

let output = ''

dryRun.stdout.on('data', (data) => {
  output += data.toString()
  if (output.includes('undefined')) {
    console.log(output)
  }
})

dryRun.stderr.on('data', (data) => {
  process.stderr.write(data)
})

dryRun.on('close', (code) => {
  if (output.includes('undefined')) {
    process.exit(1) // Sai com erro
  } else {
    const runTests = spawn('cucumber-js', [
      ...tagArgs,
      '--retry', retry,
      '--parallel', workers,
      '--import', 'hooks.js',
      '--import', 'step_definitions/Steps.mjs'
    ], { stdio: 'inherit', env })

    runTests.on('close', (testCode) => {
      process.exit(testCode)
    })
  }
})