import {
  MakeDirectoryOptions,
  Mode,
  PathLike,
  PathOrFileDescriptor,
  Stats,
  chmod,
  chown,
  copyFile,
  link,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rm,
  rmdir,
  stat,
  symlink,
  unlink,
  writeFile,
} from 'fs'

export const chmodAsync = (
  path: PathLike,
  mode: Mode,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      chmod(
        path,
        mode,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const chownAsync = (
  path: PathLike,
  uid: number,
  gid: number,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      chown(
        path,
        uid,
        gid,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const copyFileAsync = (
  src: PathLike,
  dest: PathLike,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      copyFile(
        src,
        dest,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const linkAsync = (
  existingPath: PathLike,
  newPath: PathLike,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      link(
        existingPath,
        newPath,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const lstatAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | Stats> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | Stats) => void) =>
      lstat(
        path,
        (err: NodeJS.ErrnoException, stats: Stats) =>
          resolve(err ?? stats)
      )
  )

export const mkdirAsync = (
  path: PathLike,
  options?: MakeDirectoryOptions & { recursive: true },
): Promise<NodeJS.ErrnoException | string | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | string | true) => void) =>
      mkdir(
        path,
        options,
        (err: NodeJS.ErrnoException, path?: string) =>
          resolve(err ?? path ?? true)
      )
  )

export const readdirAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | string[] | Buffer[]> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | string[] | Buffer[]) => void) =>
      readdir(
        path,
        {},
        (err: NodeJS.ErrnoException, files: string[] | Buffer[]) =>
          resolve(err ?? files)
      )
  )

export const readFileAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | Buffer> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | Buffer) => void) =>
      readFile(
        path,
        {},
        (err: NodeJS.ErrnoException, data: Buffer) =>
          resolve(err ?? data)
      )
  )

export const realpathAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | string> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | string) => void) =>
      realpath(
        path,
        {},
        (err: NodeJS.ErrnoException, resolvedPath: string) =>
          resolve(err ?? resolvedPath)
      )
  )

export const rmAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      rm(
        path,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const rmdirAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      rmdir(
        path,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const statAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | Stats> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | Stats) => void) =>
      stat(
        path,
        (err: NodeJS.ErrnoException, stats: Stats) =>
          resolve(err ?? stats)
      )
  )

export const symlinkAsync = (
  target: PathLike,
  path: PathLike,
  type: symlink.Type,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      symlink(
        target,
        path,
        type,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const unlinkAsync = (
  path: PathLike,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      unlink(
        path,
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )

export const writeFileAsync = (
  file: PathOrFileDescriptor,
  data: string | NodeJS.ArrayBufferView,
): Promise<NodeJS.ErrnoException | true> =>
  new Promise(
    (resolve: (value: NodeJS.ErrnoException | true) => void) =>
      writeFile(
        file,
        data,
        {},
        (err: NodeJS.ErrnoException) =>
          resolve(err ?? true)
      )
  )
