import type { ModuleInfo } from 'license-checker-rseidelsohn'

import type { ModuleInfoWithFromLicense } from '../type'

function parsePackageName(name: string): string {
  return name.substring(0, name.lastIndexOf('@'))
}

function getPackageVersion(name: string): string {
  return name.substring(name.lastIndexOf('@') + 1)
}

function checkIsFromLicenseFile(filePath?: string): boolean {
  if (!filePath) {
    return false
  }

  const splittedPath = filePath.split('/')
  const licenseFile = splittedPath[splittedPath.length - 1]

  if (licenseFile.toLowerCase() !== 'license') {
    return false
  }

  return true
}

export function getPackageMap(packages: Record<string, ModuleInfo>): Map<string, ModuleInfoWithFromLicense> {
  const packageMap = new Map<string, ModuleInfoWithFromLicense>()
  const packageNames = Object.keys(packages)
  const parsePackageNames = packageNames.map(pkg => ({
    original: pkg,
    name: parsePackageName(pkg),
    version: getPackageVersion(pkg),
  }))

  parsePackageNames.forEach(({ name, original, version }) => {
    packageMap.set(
      name,
      {
        ...packages[original],
        version,
        fromLicense: checkIsFromLicenseFile(packages[original].licenseFile),
      },
    )
  })

  return packageMap
}
