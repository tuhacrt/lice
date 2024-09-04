import type { License, ModuleInfoWithFromLicense } from '../type'

type RequiredLicenseInformation = Pick<ModuleInfoWithFromLicense, 'name' | 'version' | 'licenses' | 'licenseFile' | 'licenseText' | 'fromLicense' | 'repository'>

export function getManyDependencyInformation(
  packageMap: Map<string, RequiredLicenseInformation>,
  dependencyNames: Array<string>,
): Array<License> {
  const directDependencies = dependencyNames.map((name) => {
    const pkg = packageMap.get(name)

    return {
      name,
      version: pkg?.version,
      license: pkg?.licenses,
      repository: pkg?.repository,
      licenseText: (pkg?.fromLicense && pkg?.licenseText) || undefined,
    }
  })

  return directDependencies
}
