import type { License, ModuleInfoWithFromLicense } from '../type'

export function getDevelopDependencies(packageMap: Map<string, ModuleInfoWithFromLicense>, packJsonDeps: Array<string>): Array<License> {
  const directDependencies = packJsonDeps.map((name) => {
    const pkg = packageMap.get(name)

    return {
      name,
      version: pkg?.version,
      license: pkg?.licenses,
      repository: pkg?.repository,
      licenseText: pkg?.fromLicense ? pkg?.licenseText : undefined,
    }
  })

  return directDependencies
}
