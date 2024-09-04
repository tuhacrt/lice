import { readFileSync } from 'node:fs'
import { join } from 'node:path'

function readPackageJsonFile(filePath: string): any {
  const packageJsonPath = join(filePath, 'package.json')
  const packageJson = readFileSync(packageJsonPath, 'utf8')

  return JSON.parse(packageJson)
}

export function getDependencies(filePath: string): Array<string> {
  const packageJson = readPackageJsonFile(filePath)
  const devDependencies = Object.keys(packageJson.devDependencies)
  const dependencies = Object.keys(packageJson.dependencies)

  return [...new Set([...dependencies, ...devDependencies])]
}
