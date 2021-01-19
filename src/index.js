const { program } = require('commander');
program.version(require('../package.json').version);

(async () => {
    program
        .option('-p, --provider <provider>', 'Immutability provider from the list [ iota ]', 'iota')
        .option('-conf, --config', 'Path to the config file');

    program
        .command('immut [hash] [identifier]')
        .option('-d, --data', 'Instead of a hash, a string is used that creates a hash')
        .action(async (hash, identifier, options, command) => {
            console.log(await require('./immutability/' + globalOptions.provider).immut({
                identifier,
                data: options.data ? (stdin ? stdin : hash) : undefined,
                hash: !options.data ? (stdin ? stdin : hash) : undefined
            }))
        })

    program
        .command('setup <protocol>')

    program
        .command('audit <immutabilityIdentifier> [hash]')
        .option('-d, --data', 'Instead of a hash data is used that creates a hash')
        .action(async (immutabilityIdentifier, hash, options, command) => {
            console.log(await require('./immutability/' + globalOptions.provider).audit({
                immutabilityIdentifier,
                data: options.data ? (stdin ? stdin : hash) : undefined,
                hash: !options.data ? (stdin ? stdin : hash) : undefined
            }))
        })

    var stdin = '';
    const globalOptions = program.opts();
    if (process.stdin.isTTY) {
        await program.parseAsync(process.argv);
    }
    else {
        process.stdin.on('readable', function () {
            var chunk = this.read();
            if (chunk !== null) {
                stdin += chunk;
            }
        });
        process.stdin.on('end', function () {
            program.parse(process.argv);
        });
    }
})()