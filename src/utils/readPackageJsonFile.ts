import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function readPackageJsonFile(filePath: string): any {
  const packageJsonPath = join(filePath, 'package.json')
  const packageJson = readFileSync(packageJsonPath, 'utf8')

  return JSON.parse(packageJson)
}
