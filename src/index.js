const { program } = require('commander');
program.version(require('../package.json').version);

(async () => {
    program
        .option('-p, --provider <provider>', 'Immutability provider from the list [ iota ]', 'iota')
        .option('-c, --communication <protocol>', 'Communication protocoll from the list [cli , http, mqtt]', 'cli')
        .option('-conf, --config', 'Path to the config file');

    program
        .command('immut <hash> [identifier]')


    program
        .command('audit <hash> <immutabilityIdentifier>')
        .action(async (name, options, command) => {
            console.log('name:' + name, 'options:' + options, 'command:' + command)
        })

    await program.parseAsync(process.argv);
})()