import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import type { License } from '../type'

function parseOutputFileName(outputFileName: string, type: string): string {
  return outputFileName?.trim()
    ? `${outputFileName.replace(`.${type}`, '')}.${type}`
    : `packageDependencies.${type}`
}

export function writeJsonFile(outputFilePath: string, dependencies: Array<License>, outputFileName: string): void {
  const filePath = join(outputFilePath, parseOutputFileName(outputFileName, 'json'))

  // Ensure the directory exists, create it if not
  const dir = dirname(filePath)

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const content: Record<string, Record<string, Partial<License>>> = {}
  const allLicenses = [...new Set(dependencies.map(({ license }) => license ?? 'unknown'))]

  allLicenses.forEach((license) => {
    content[license.toString()] = {}
  })

  dependencies.forEach((dependency) => {
    const license = dependency?.license || 'unknown'

    // remove the name property from the dependency object, as it is already the key
    content[license.toString()][dependency.name] = { ...dependency, name: undefined }
  })

  return writeFileSync(filePath, JSON.stringify(content, null, 2))
}
