import type { ModuleInfo } from 'license-checker-rseidelsohn'

import type { ModuleInfoWithFromLicense } from '../type'

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

export function getPackageInformationMap(packages: Record<string, ModuleInfo>): Map<string, ModuleInfoWithFromLicense> {
  const packageInformationMap = new Map<string, ModuleInfoWithFromLicense>()

  Object.entries(packages)
    .map(([original, { name, version }]) => ({ original, name, version }))
    .forEach(({ name, original, version }) => {
      packageInformationMap.set(
        name || original,
        {
          ...packages[original],
          // remove the name property from the dependency object, as it is already the key
          name: undefined,
          version,
          fromLicense: checkIsFromLicenseFile(packages[original].licenseFile),
        },
      )
    })

  return packageInformationMap
}
