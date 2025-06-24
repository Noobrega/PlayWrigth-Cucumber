const { spawn } = require('child_process')

const args = process.argv.slice(2) // Take the arguments passed by terminal
const env = { ...process.env, FORCE_COLOR: '3' }

let tagArgs = ['--tags', 'not @skip']

/*
To run using tags we have to make like: npm test -- --tags "@Access"
Example: npm test -- --tags "@WCIT @HIQ"

If we don't need the tags, just use the normal npm test

For retry, follow the same template:
--retry Quantity
Example: npm test -- --retry 5

We can use just one or more arguments
Example: npm test -- --tags "@Access" --retry 4
*/

const tagIndex = args.findIndex(arg => arg === '--tags')
if (tagIndex !== -1 && args[tagIndex + 1]) {
  tagArgs = ['--tags', `not @skip and ${args[tagIndex + 1]}`] // mix the tags
}

let retry = 2
const retryIndex = args.findIndex(arg => arg === '--retry')
if (retryIndex !== -1 && args[retryIndex + 1]) {
  retry = args[retryIndex + 1] // take how many tries
}

const dryRun = spawn('cucumber-js', [
  '--dry-run',
  ...tagArgs,
  '--require', 'hooks.js',
  '--import', 'Tests/Step/Steps.js'
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
      '--require', 'hooks.js',
      '--import', 'Tests/Step/Steps.js'
    ], { stdio: 'inherit', env })

    runTests.on('close', (testCode) => {
      process.exit(testCode)
    })
  }
})
