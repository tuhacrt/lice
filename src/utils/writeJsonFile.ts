import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import type { License } from '../type'

function parseOutputFileName(outputFileName: string, type: string): string {
  return outputFileName?.trim()
    ? `${outputFileName.replace(`.${type}`, '')}.${type}`
    : `packageDependencies.${type}`
}

function recursiveSort(obj: Record<string, any>): Record<string, any> {
  return Object.keys(obj)
    .sort((a, b) => {
      if (a.startsWith('(') && b.startsWith('(')) {
        return a.localeCompare(b)
      }
      else if (a.startsWith('(')) {
        return 1
      }
      else if (b.startsWith('(')) {
        return -1
      }
      else {
        return a.localeCompare(b)
      }
    })
    .reduce((acc, key) => {
      const value = obj[key]

      if (typeof value === 'object' && !Array.isArray(value)) {
        acc[key] = recursiveSort(value)
      }
      else {
        acc[key] = value
      }

      return acc
    }, {} as Record<string, any>)
}

export function writeJsonFile(outputFilePath: string, dependencies: Array<License>, outputFileName: string): string {
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

  const sortedContent = recursiveSort(content)
  const stringifiedContent = JSON.stringify(sortedContent, null, 2)

  writeFileSync(filePath, stringifiedContent)

  return stringifiedContent
}
