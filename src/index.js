const { program, option } = require('commander');
const fs = require('fs')
program.version(require('../package.json').version);

(async () => {
    program
        .option('-c, --config <configPath>', 'Path to the config file')
        .option('-p, --provider <provider>', 'Immutability provider from the list [ iota ]', 'iota')

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
        .command('setup [communicationProtocol]')
        .action(async (communicationProtocol, options, command) => {
            let config = JSON.parse(fs.readFileSync(globalOptions.config, 'utf-8'))
            require('./communication/' + communicationProtocol)(require('./immutability/' + globalOptions.provider), config)
        })

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
        await program.parseAsync(process.argv)
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