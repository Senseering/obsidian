const { connect, StringCodec } = require("nats");

module.exports = async (immutabilityProvider, config) => {
    console.log(immutabilityProvider, config)

    const nc = await connect({ servers: config.nats.host });
    for (const mapping of config.nats.mappings) {
        const sc = StringCodec();
        const sub = nc.subscribe(mapping.source);
        console.log(mapping.source)
        for await (const m of sub) {
            let data = sc.decode(m.data)
            let immutability = await immutabilityProvider.immut({
                data
            })
            data = JSON.parse(data)
            data.identifier = immutabilityProvider.url + immutability
            nc.publish(mapping.target, sc.encode(JSON.stringify(data)));
        }
        console.log("subscription closed");
    }
}