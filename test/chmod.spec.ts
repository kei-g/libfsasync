import { chmodAsync, mkdirAsync, rmdirAsync } from '../src/index.ts'
import { describe, it } from 'node:test'
import { equal } from 'node:assert'
import { existsSync } from 'node:fs'

describe('chmod', () => {
  it('successful', async () => {
    if (!existsSync('tmp0'))
      equal(await mkdirAsync('tmp0'), true)
    equal(await mkdirAsync('tmp0/chmod'), true)
    equal(await chmodAsync('tmp0/chmod', 0o777), true)
    equal(await rmdirAsync('tmp0/chmod'), true)
  })
})
