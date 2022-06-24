const { Command } = require('commander');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const toTitleCase = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

const excludedFilesAndFolders = `-not -path "*/node_modules/*" \
                                -a -not -path '*/build/*' \
                                -a -not -path '*/Pods/*' \
                                -a -not -path '*.git*' \
                                -a -not -path '*.husky*' \
                                -a -not -path '*.DS_Store*' \
                                -a -not -path '*.circleci*' \
                                -a -not -path '*.jar*' \
                                -a -not -path '*.keystore*' \
                                -a -not -path '*.png*' \
                                -a -not -path '*xcuserdata*' \
                                -a -not -path '*rename.js*'`;

const findAndReplace = async (from, to) => {
  const replaceCommand = `find ${__dirname}/.. -type f \
        ${excludedFilesAndFolders} \
        -exec sed -i '' 's/${from}/${to}/g' {} \\;`;
  console.log(`replacing ${from} -> ${to}`);
  await exec(replaceCommand);
};

const renameFilesAndFolders = async (from, to) => {
  await exec(`find ${__dirname}/.. \
        ${excludedFilesAndFolders} \
        | yarn renamer --find  ${from} --replace ${to}`);
};

const renameFiles = async (moduleName, clean, title) => {
  await renameFilesAndFolders('turbo-starter', moduleName);
  await renameFilesAndFolders('TurboStarter', title);
  await renameFilesAndFolders('reactnativeturbostarter', `reactnative${clean}`);
  await renameFilesAndFolders('TurboStarterExample', `${title}Example`);
};

const replace = async (moduleName, clean, cleanUpper, space, title) => {
  await findAndReplace('turbo-starter', moduleName);
  await findAndReplace('turbostarter', clean);
  await findAndReplace('TURBOSTARTER', cleanUpper);
  await findAndReplace('Turbo Starter', space);
  await findAndReplace('TurboStarter', title);
};

const program = new Command();

program
  .requiredOption('-m, --module-name <name>', 'Your new module name')
  .option('-c, --clean', 'Remove script dependencies in package.json')
  .action(async (args) => {
    const { moduleName, clean } = args;
    const cleanModuleName = moduleName.replaceAll('-', '');
    const cleanUpper = cleanModuleName.toUpperCase();
    const space = toTitleCase(moduleName.replaceAll('-', ' '));
    const title = space.replaceAll(' ', '');
    console.log('Module name:', moduleName);
    console.log('Clean:', cleanModuleName);
    console.log('Clean Upper:', cleanUpper);
    console.log('Space:', space);
    console.log('Title:', title);
    console.log('Rename files and folders');
    await renameFiles(moduleName, cleanModuleName, title);
    console.log('find and rename files contents');
    await replace(moduleName, cleanModuleName, cleanUpper, space, title);
    if (clean) {
      console.log('Removing script and dependencies');
      await exec(`yarn remove renamer`);
      await exec(`yarn remove commander`);
    }
  });

program.parse();
