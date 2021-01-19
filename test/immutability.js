var assert = require('assert');
let identifier = '35.158.171.149|23ef3090-2533-11eb-8f18-cfe8b565534b|e463a120-2863-11eb-a452-15fa4055e1f3';
let data = 'This is some test data that should be send and verified';
let hash = require('crypto')
    .createHash('sha512')
    .update(data)
    .digest('hex')

require('fs').readdirSync('./src/immutability/').forEach(dir => {
    let immutabilityProvider = require('../src/immutability/' + dir); 
    describe('Immutability provider test [ ' + dir + ' ]:', function () {
        it('Correct hash values given should return true', async function () {
            let immutabilityIdentifier = await immutabilityProvider.immut({
                identifier,
                hash
            })
            let auditResult = await immutabilityProvider.audit({
                immutabilityIdentifier,
                hash
            })
            assert.equal(auditResult, true)
        });
        it('Wrong hash values given should return false', async function () {
            let immutabilityIdentifier = await immutabilityProvider.immut({
                identifier,
                hash
            })
            let auditResult = await immutabilityProvider.audit({
                immutabilityIdentifier,
                hash: hash + 'a'
            })
            assert.equal(auditResult, false)
        });
        it('Correct data given should return true', async function () {
            let immutabilityIdentifier = await immutabilityProvider.immut({
                identifier,
                data
            })
            let auditResult = await immutabilityProvider.audit({
                immutabilityIdentifier,
                data
            })
            assert.equal(auditResult, true)
        });
        it('Wrong data given should return false', async function () {
            let immutabilityIdentifier = await immutabilityProvider.immut({
                identifier,
                data
            })
            let auditResult = await immutabilityProvider.audit({
                immutabilityIdentifier,
                data: data + 'a'
            })
            assert.equal(auditResult, false)
        });
        it('Data given but hash for audit should return true', async function () {
            let immutabilityIdentifier = await immutabilityProvider.immut({
                identifier,
                data
            })
            let auditResult = await immutabilityProvider.audit({
                immutabilityIdentifier,
                hash
            })
            assert.equal(auditResult, true)
        });
        it('Hash given but data for audit should return true', async function () {
            let immutabilityIdentifier = await immutabilityProvider.immut({
                identifier,
                hash
            })
            let auditResult = await immutabilityProvider.audit({
                immutabilityIdentifier,
                data
            })
            assert.equal(auditResult, true)
        });
    });
})
