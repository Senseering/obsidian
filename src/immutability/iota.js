const { ClientBuilder } = require('iota-client')
const crypto = require('crypto');
const client = new ClientBuilder()
    .node('http://35.158.171.149:14265')
    .build();


let iota = {}

iota.url = "https://explorer.iota.org/chrysalis/message/"

iota.immut = async ({ identifier = '@senseering/obsidian', hash, data }) => {
    let cryptoHash = crypto.createHash('sha256');
    cryptoHash.update(identifier)
    let identifierHash = cryptoHash.digest('hex')
    if (hash) {
        return await iota.sendMessage({ identifier: identifierHash, data: hash })
    } else {
        cryptoHash = crypto.createHash('sha512');
        if (typeof data !== 'object') {
            cryptoHash.update(data)
        } else {
            cryptoHash.update(JSON.stringify(data))
        }
        return await iota.sendMessage({ identifier: identifierHash, data: cryptoHash.digest('hex') })
    }
}

iota.audit = async ({ immutabilityIdentifier, hash, data }) => {
    let message = await iota.getMessage({ identifier: immutabilityIdentifier })
    let payload = new TextDecoder().decode(new Uint8Array(message.message.payload.data.data))
    if (hash) {
        return (hash) === payload
    } else {
        const cryptoHash = crypto.createHash('sha512');
        cryptoHash.update(data)
        return cryptoHash.digest('hex') === payload
    }
}

iota.sendMessage = async ({ identifier, data }) => {
    if (identifier.length > 64 || identifier.length <= 0)
        throw new Error("Identifier not the correct length")
    if (data.length > 32 * 1024)
        throw new Error("Too much data")
    
    let immutabilityIdentifier = await client.message()
        .index(identifier)
        .data(new TextEncoder().encode(data))
        .submit()

    return immutabilityIdentifier.messageId
}

iota.getMessage = async ({ identifier }) => {
    let message = await client.getMessage()
        .data(identifier)
    return message
}

module.exports = {
    immut: iota.immut,
    audit: iota.audit,
    url: iota.url
}