#!/usr/bin/env node

import { copyFileAsync, readdirAsync, statAsync } from '../src/lib/fs-async'

(async () => {
  const fatalExit = (err?: unknown) => {
    process.stderr.write(`${err instanceof Error ? err.message : err}\n`)
    process.exit(1)
  }

  if (process.argv.length < 4)
    return fatalExit('too few arguments')

  const argv2 = process.argv[2].split('/')

  const srcpattern = argv2.splice(argv2.length - 1).join('')
  const match = srcpattern.match(/^\*(?<ext>(\.[^\\.]+)+)$/)
  if (!match)
    return fatalExit(`invalid pattern, ${srcpattern}`)

  const srcdir = argv2.join('/')
  const srcstat = await statAsync(srcdir)
  if (srcstat instanceof Error)
    return fatalExit(srcstat)
  if (!srcstat.isDirectory())
    fatalExit(`${srcdir} is not a directory`)
  const dstdir = process.argv[3]
  const dststat = await statAsync(dstdir)
  if (dststat instanceof Error)
    return fatalExit(dststat)
  if (!dststat.isDirectory())
    return fatalExit(`${dstdir} is not a directory`)
  const files = await readdirAsync(srcdir)
  if (files instanceof Error)
    return fatalExit(files)
  const tasks = files.map(
    (path: string | Buffer) => typeof path === 'string' ? path : path.toString()
  ).filter(
    (path: string) => path.endsWith(match.groups['ext'])
  ).map(
    (name: string) => copyFileAsync(`${srcdir}/${name}`, `${dstdir}/${name}`)
  )
  const errors = [] as string[]
  for (const maybeError of await Promise.all(tasks))
    if (maybeError instanceof Error)
      errors.push(maybeError.message)
  if (errors.length)
    return errors.push(''), fatalExit(errors.join('\n'))
  process.exit(0)
})()
