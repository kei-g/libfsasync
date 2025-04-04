import { chmodAsync, mkdirAsync, rmdirAsync } from '../src'
import { describe, it } from 'mocha'
import { equal } from 'node:assert'
import { existsSync } from 'node:fs'

describe('chmod', () => {
  it('successful', async () => {
    if (!existsSync('tmp'))
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/chmod'), true)
    equal(await chmodAsync('tmp/chmod', 0o777), true)
    equal(await rmdirAsync('tmp/chmod'), true)
  })
})
