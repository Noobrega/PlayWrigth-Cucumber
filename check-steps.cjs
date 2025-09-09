/* eslint-disable */
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const dotenv = require('dotenv')

// =========== 1) Require ENV and load .env.<ENV> (no fallback) ===========
const envNameRaw = process.env.ENV
if (!envNameRaw) {
  console.error('[ERROR] Missing ENV. Set it via npm script, e.g.: cross-env ENV=qa node check-steps.cjs')
  process.exit(1)
}
const envNameLc = String(envNameRaw).toLowerCase()

// Only try .env.<ENV> variants (no .env.dev fallback)
const envCandidates = [
  path.resolve(__dirname, `.env.${envNameRaw}`),                                       // e.g. .env.QA
  path.resolve(__dirname, `.env.${envNameLc}`),                                        // e.g. .env.qa
  path.resolve(__dirname, `.env.${envNameLc[0].toUpperCase()}${envNameLc.slice(1)}`),  // e.g. .env.Qa
]

const envPath = envCandidates.find(p => p && fs.existsSync(p))
if (!envPath) {
  console.error(`[ERROR] .env file for ENV="${envNameRaw}" not found. Looked for:`)
  envCandidates.forEach(p => console.error(`  - ${p}`))
  process.exit(1)
}
dotenv.config({ path: envPath })
//console.log(`[INFO] Loaded env file: ${path.basename(envPath)} (ENV=${envNameRaw})`)

// =========== 2) Resolve Cucumber CLI (robust) ===========
function resolveCucumberCli() {
  const candidates = [
    path.join(__dirname, 'node_modules', '@cucumber', 'cucumber', 'bin', 'cucumber-js'),
    path.join(process.cwd(), 'node_modules', '@cucumber', 'cucumber', 'bin', 'cucumber-js'),
  ]
  for (const p of candidates) if (fs.existsSync(p)) return p
  throw new Error('Could not find @cucumber/cucumber/bin/cucumber-js in node_modules.')
}
const cucumberCli = resolveCucumberCli()
//console.log('[OK] cucumber-js:', cucumberCli)

// =========== 3) Run cucumber via Node ===========
function runCucumber(args, stdio = 'inherit') {
  return spawn(process.execPath, [cucumberCli, ...args], {
    stdio,
    env: { ...process.env, FORCE_COLOR: '3' },
    shell: false
  })
}

// =========== 4) CLI flags ===========
const cli = process.argv.slice(2)

// --tags
let tagArgs = ['--tags', 'not @skip']
const ti = cli.indexOf('--tags')
if (ti !== -1 && cli[ti + 1]) tagArgs = ['--tags', `not @skip and ${cli[ti + 1]}`]

// --retry
let retry = '1'
const ri = cli.indexOf('--retry')
if (ri !== -1 && cli[ri + 1]) retry = String(cli[ri + 1])

// --workers (default: numeric CI from env or 4)
let workers = parseInt(process.env.CI ?? '', 10)
if (Number.isNaN(workers) || workers < 1) workers = 4
const wi = cli.indexOf('--workers')
if (wi !== -1 && cli[wi + 1]) {
  const w = parseInt(cli[wi + 1], 10)
  if (!Number.isNaN(w) && w > 0) workers = w
}

//console.log(`[INFO] baseUrl: ${process.env.baseUrl || '(not defined in .env)'}`)
//console.log(`[INFO] workers: ${workers}`)

// =========== 5) Project imports (adjust paths/casing) ===========
const imports = [
  '--import', 'hooks.js',
  '--import', 'tests/steps/Steps.mjs',
]

// =========== 6) Dry-run to catch "undefined" steps ===========
const dryArgs = ['--dry-run', ...tagArgs, ...imports]
let dryOut = ''

// console.log('---------------------------------- CHECK-STEPS ----------------------------------')
// console.log('ls e2e/Tests/Features:', fs.readdirSync('e2e/Tests/Features').join('\n'))
// console.log('steps exists?', fs.existsSync('e2e/Tests/Steps/Steps.mjs'))
// console.log('env:', envNameRaw)
// console.log(`Running with CUCUMBER_WORKER_ID=${process.env.CUCUMBER_WORKER_ID || 'not defined'}`)
// console.log('---------------------------------- CHECK-STEPS ----------------------------------')

const dry = runCucumber(dryArgs, 'pipe')
dry.stdout.on('data', d => { dryOut += d.toString(); })
dry.stderr.on('data', d => process.stderr.write(d))
dry.on('error', err => {
  console.error('[ERROR] Failed to execute cucumber-js (dry-run):', err.message)
  process.exit(1)
})

dry.on('close', () => {
  if (dryOut.toLowerCase().includes('undefined')) {
    console.log(dryOut)
    process.exit(1)
  }

  // Real run
  const runArgs = [
    ...tagArgs,
    '--retry', String(retry),
    '--parallel', String(workers),
    ...imports
  ]

  const run = runCucumber(runArgs, 'inherit')
  run.on('error', err => {
    console.error('[ERROR] Failed to execute cucumber-js (run):', err.message)
    process.exit(1)
  })
  run.on('close', code => process.exit(code))
});