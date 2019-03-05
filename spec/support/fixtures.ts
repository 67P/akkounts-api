import * as fs from 'fs'
import * as path from 'path'

let loadJSON = (name) => {
  let data = fs.readFileSync(path.join('spec/fixtures', name), 'utf8')
  return JSON.parse(data)
}

export { loadJSON }
