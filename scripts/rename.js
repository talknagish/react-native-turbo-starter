const { exit } = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawnSync = require('child_process').spawnSync;

const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  encoding: 'utf-8',
};

if (process.argv.length !== 3) {
  console.log('Missing parameter');
  exit(-1);
}
const moduleName = process.argv.slice(-1)[0];

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

async function findAndReplace(from, to) {
  const replaceCommand = `find . -type f \
        -not -path './node_modules*' \
        -a -not -path '*.git*' \
        -a -not -path '*.husky*' \
        -a -not -path '*.DS_Store*' \
        -a -not -path '*.jar*' \
        -a -not -path '*.keystore*' \
        -a -not -path '*.png*' \
        -a -not -path '*xcuserdata*' \
        -a -not -path '*rename.js*' \
        -a -not -name '*~' \
        -exec sed -i '' 's/${from}/${to}/g' {} \\;`;
  console.log(`replacing ${from} -> ${to}`);
  const { stdout, stderr } = await exec(replaceCommand);
  console.log(stdout, stderr);
}

async function init() {
  const result = spawnSync('brew', ['install', 'rename'], options);
  console.log(result);
}

const clean = moduleName.replace('-', '');
const cleanUpper = clean.toUpperCase();
const space = toTitleCase(moduleName.replace('-', ' '));
const title = space.replace(' ', '');

async function renameFilesAndFolders(from, to) {
  console.log('rename', from, to);
  const result = spawnSync(
    'node_modules/.bin/renamer',
    ['--find', from, '--replace', to, '**', '--force'],
    options
  );
  console.log(result);
}

async function renameFiles() {
  await renameFilesAndFolders('turbo-starter', moduleName);
  await renameFilesAndFolders('TurboStarter', title);
  await renameFilesAndFolders(
    'reactnativeturbostarter',
    `react-native-${clean}`
  );
  await renameFilesAndFolders('TurboStarterExample', `${title}Example`);
}

async function replace() {
  await findAndReplace('turbo-starter', moduleName);
  await findAndReplace('turbostarter', clean);
  await findAndReplace('TURBOSTARTER', cleanUpper);
  await findAndReplace('Turbo Starter', space);
  await findAndReplace('TurboStarter', title);
}

async function run() {
  console.log('init rename');
  await init();
  console.log('renaming');
  await renameFiles();
  console.log('find and replace');
  await replace();
}

run();
