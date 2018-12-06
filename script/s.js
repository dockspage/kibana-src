/**
 * This script that the bro will write will see the source code file and find it on github with the rqt
 */
import { existsSync } from 'fs'
import { resolve } from 'url'
import rqt, { aqt } from 'rqt'
import readDirStructure from '@wrote/read-dir-structure'
import write from '@wrote/write'
import ensurePath from '@wrote/ensure-path'

const BASE = 'https://raw.githubusercontent.com/elastic/kibana/v6.5.0/'
const TO = 'src-github'

;(async () => {
  const res = await readDirStructure('src')
  const paths = iterate(res, 'src', ['__fixtures__'])
  //, 'test.ts','test.tsx', 'test.js', 'test.jsx'])
  // const [a,b,c] = paths
  // console.log('%s\n%s\n%s\n ...%s more', a, b, c, keys.length - 3)
  console.log('Found %s paths', paths.length)
  await paths.reduce(async (acc, p) => {
    await acc
    const url = resolve(BASE, p)
    const to = p.replace(/^src/, TO)
    if (existsSync(to)) {
      process.stdout.write('c')
      return
    }
    if (url.endsWith('css')) return
    const t = await findUrl(url)
    console.log(t)
    const f = await rqt(t)
    await ensurePath(to)
    await write(to, f)
    // if (e) {
    //   process.stdout.write('.')
    // } else {
    //   f = await read(p)
    //   process.stdout.write('-')
    // }
    //
    // await write(to, f)
    // if (!/Cannot read property/.test(err.stack)) throw err // bug in rqt when no content-type is set, meaning 404
    // try {
    //   const url2 = url.replace(/js$/, 'ts')
    //   const { statusCode } = await aqt(url2, { justHeaders: true })
    //   if (statusCode == 200) {
    //     const f = await read(p)
    //     await write(to, f)
    //     process.stdout.write('t')
    //   }
    // } catch (e) {
    //   // console.log('\n===\n',e,'===')
    //   process.stdout.write('x')
    // }
  }, {})
})()

const exists = async (url) => {
  try {
    const { statusCode } = await aqt(url, { justHeaders: true })
    return statusCode == 200
  } catch (err) {
    return false
  }
}

const findUrl = async (url) => {
  const e = await exists(url)
  if (e) return url
  let iss
  const t = ['ts', 'jsx', 'tsx']
  while (!iss) {
    if (!t.length)
      throw new Error('Cannot find type for ' + url)
    iss = await is(url, t.shift())
  }
  return iss
}

const is = async (url, type) => {
  const u = url.replace(/\.\w+?$/, `.${type}`)
  const t = await exists(u)
  if (t) return u
}

/**
 * Find all files in the folder.
 */
const iterate = ({ content, type }, path, ignore = []) => {
  if (ignore.some(i => path.endsWith(i))) return []
  if (type == 'Directory') {
    const keys = Object.keys(content).reduce((acc, key) => {
      const newItem = content[key]
      const newPath = `${path}/${key}`
      const newPaths = iterate(newItem, newPath, ignore)
      return [...acc, ...newPaths]
    }, [])
    return keys
  } else if (type == 'File') {
    return [path]
  } else {
    throw new Error('Unknown filetype ' + type)
  }
}