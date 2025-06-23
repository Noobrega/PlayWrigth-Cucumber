import path from "path";

export const paths = {
  baseUrl: 'your_base_url_here', // Update with your base URL
  // baseUrl: 'your_base_url_here', // Dev URL
  // baseUrl: 'your_base_url_here', // Discounts Env URL
  // baseUrl: 'your_base_url_here', // update to prod URL

  rootDir: path.resolve(),
  e2eDir: path.resolve('e2e'),
  screenshotsDir: path.resolve('e2e', 'screenshots'),
  reportsDir: path.resolve('e2e', 'reports'),
  dataDir: path.resolve('e2e', 'Data'),
  dataVideosDir: path.resolve('e2e', 'Data', 'Videos'),
  LastRunDir: path.resolve('e2e', 'Last_Run'),
  LLastRunDir: path.resolve('e2e', 'Last_Last_Run'),
  testDataDir: path.resolve('e2e', 'test-data'),
  filesDir: path.resolve('e2e', 'test-data', 'Files'),
  envFile: path.resolve('.env.e2e'),
  checkStepsFile: path.resolve('check-steps.cjs'),
  downloadsDir: path.resolve('e2e', 'downloads')
};
