/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-08T19:05:26+02:00
 * @Copyright: Technology Studio
**/

import { readFileSync, realpathSync } from 'fs'
import { dirname, join } from 'path'

const processImports = (schema: string, folderPath: string): string => {
  return schema.replace(/[^\n]*(\/\/)\s*@import[^']*'(?<importFile>[^']*)'[^\n]*/gs, (...match) => {
    const groups = match[match.length - 1]
    const importFilePath = groups.importFile
    return loadSchemaAndProcessImports(join(folderPath, importFilePath))
  })
}

export const loadSchemaAndProcessImports = (filePath: string): string => {
  let schema = readFileSync(filePath, 'utf-8')
  schema = processImports(schema, realpathSync(dirname(filePath)))
  return schema
}
