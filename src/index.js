let immutabilityProvider = require('./immutability/iota');



(async () => {
    let immtuabilityIdentifier = await immutabilityProvider.immut({
        identifier: '35.158.171.149|23ef3090-2533-11eb-8f18-cfe8b565534b|e463a120-2863-11eb-a452-15fa4055e1f3',
        signature: '4YXDWyEe9RTE6KtQ+64sj8BHTz6t9+p/dokG4VAc/z6AwvkOFaGbWjWtBnEpxe5xkvegeG5zYkkm5+Fgi59p1JyqSZQkouROC2Z8zbMNEL4u1ec3zGKIBG1Y9NcFZOkF2c3juyrnAfDEE4hv89Hy5TX4iE4FUfecxq3URfM21W4='
    })
    let auditResult = await immutabilityProvider.audit({
        immtuabilityIdentifier,
        signature: '4YXDWyEe9RTE6KtQ+64sj8BHTz6t9+p/dokG4VAc/z6AwvkOFaGbWjWtBnEpxe5xkvegeG5zYkkm5+Fgi59p1JyqSZQkouROC2Z8zbMNEL4u1ec3zGKIBG1Y9NcFZOkF2c3juyrnAfDEE4hv89Hy5TX4iE4FUfecxq3URfM21W4='
    })
    console.log(auditResult)
})()