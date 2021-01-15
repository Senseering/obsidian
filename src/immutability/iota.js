const { ClientBuilder } = require('iota-client')
const client = new ClientBuilder()
    .node('http://35.158.171.149:14265')
    .build();
(async () => {
    try {
        let res = await client.send()
            .indexation("35.158.171.149:23ef3090-2533-11eb-8f18-cfe8b565534b")
            .data(new TextEncoder().encode(JSON.stringify({
                worker: "23ef3090-2533-11eb-8f18-cfe8b565534b",
                data: "e463a120-2863-11eb-a452-15fa4055e1f3",
                created_at: 1605569506352,
                signature: "4YXDWyEe9RTE6KtQ+64sj8BHTz6t9+p/dokG4VAc/z6AwvkOFaGbWjWtBnEpxe5xkvegeG5zYkkm5+Fgi59p1JyqSZQkouROC2Z8zbMNEL4u1ec3zGKIBG1Y9NcFZOkF2c3juyrnAfDEE4hv89Hy5TX4iE4FUfecxq3URfM21W4=",
                domain: "35.158.171.149"
            })))
            .submit()
        console.log(res)
    } catch (err) {
        console.log(err)
    }
})()
