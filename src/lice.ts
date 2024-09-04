import { init } from 'license-checker-rseidelsohn'

import { getManyDependencyInformation } from './utils/getManyDependencyInformation'
import { getManyUniqueDependencyNames } from './utils/getManyUniqueDependencyNames'
import { getPackageInformationMap } from './utils/getPackageInformationMap'
import { readPackageJsonFile } from './utils/readPackageJsonFile'
import { writeJsonFile } from './utils/writeJsonFile'

export function lice(start: string, outputFilePath: string, outputFileName: string): void {
  init(
    {
      start,
      customFormat: {
        name: '',
        version: '',
        description: '',
        licenses: '',
        copyright: '',
        licenseFile: '',
        licenseText: '',
        licenseModified: '',
      },
    },
    (err, moduleInfos) => {
      if (err) {
        throw err
      }

      if (!outputFilePath) {
        throw new Error('please specify where to create the file as third argument')
      }

      const packageMap = getPackageInformationMap(moduleInfos)
      const dependencies = readPackageJsonFile(start)
      const uniqueDependencyNames = getManyUniqueDependencyNames(dependencies)
      const directDevDependencies = getManyDependencyInformation(packageMap, uniqueDependencyNames)

      return writeJsonFile(outputFilePath, directDevDependencies, outputFileName)
    },
  )
}
