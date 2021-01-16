const { ClientBuilder } = require('iota-client')
const crypto = require('crypto');
const cryptoHash = crypto.createHash('sha256');
const client = new ClientBuilder()
    .node('http://35.158.171.149:14265')
    .build();


let iota = {}

iota.immut = async ({ identifier, signature, hash, data }) => {
    cryptoHash.update(identifier)
    let identifierHash = cryptoHash.digest('hex')
    if (signature || hash) {
        return await iota.sendMessage({ identifier: identifierHash, data: signature || hash })
    } else {
        if (typeof data !== 'object') {
            cryptoHash.update(data)
        } else {
            cryptoHash.update(JSON.stringify(data))
        }
        return await iota.sendMessage({ identifier: identifierHash, data: cryptoHash.digest('hex') })
    }
}

iota.audit = async ({ immtuabilityIdentifier, signature, hash, data }) => {
    let message = await iota.getMessage({ identifier: immtuabilityIdentifier })
    let payload = new TextDecoder().decode(new Uint8Array(message.payload.data.data))
    if (signature || hash) {
        return (signature || hash) === payload
    } else {
        cryptoHash.update(data)
        return cryptoHash.digest('hex') === payload
    }
}

iota.sendMessage = async ({ identifier, data }) => {
    if (identifier.length > 64 || identifier.length <= 0)
        throw new Error("Identifier not the correct length")
    if (data.length > 32 * 1024)
        throw new Error("Too much data")

    let immtuabilityIdentifier = await client.send()
        .indexation(identifier)
        .data(new TextEncoder().encode(data))
        .submit()

    return immtuabilityIdentifier
}

iota.getMessage = async ({ identifier }) => {
    let message = await client.getMessage()
        .data(identifier)
    return message
}

module.exports = {
    immut: iota.immut,
    audit: iota.audit
}