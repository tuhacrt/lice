import { init } from 'license-checker-rseidelsohn'

import { getDependencies } from '../utils/getDependencies'
import { getDevelopDependencies } from '../utils/getDevelopDependencies'
import { getPackageMap } from '../utils/getPackageMap'
import { writeJsonFile } from '../utils/writeJsonFile'

export function lice(pkgFilePath: string, outputFilePath: string, outputFileName: string): void {
  init(
    {
      start: pkgFilePath,
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
    (err, packages) => {
      if (err) {
        throw err
      }
      else {
        const packageMap = getPackageMap(packages)
        const dependencies = getDependencies(pkgFilePath)
        const directDevDependencies = getDevelopDependencies(packageMap, dependencies)

        if (!outputFilePath) {
          throw new Error('please specify where to create the file as third argument')
        }

        return writeJsonFile(outputFilePath, directDevDependencies, outputFileName)
      }
    },
  )
}
