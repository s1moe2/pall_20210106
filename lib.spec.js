const assert = require('assert')
const pall = require('./index')

const asyncOperation = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    });
}

const failAsyncOperation = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(time)
        }, time)
    });
}

it('should reject if one of the promises rejects', async () => {
    const input = [
        failAsyncOperation(1000),
        asyncOperation(3000),
        asyncOperation(2000),
    ]

    let success = false
    try {
        await pall(input)
    } catch (err) {
        success = true
    }

    if (!success) throw Error("Should not resolve")
    return
})

it('should resolve all', async () => {
    const input = [
        asyncOperation(1000),
        asyncOperation(3000),
        asyncOperation(2000),
    ]

    try {
        const result = await pall(input)
        assert.deepEqual(result, [1000, 3000, 2000])
        return true
    } catch (err) {
        throw new Error("Unexpected error")
    }
})
