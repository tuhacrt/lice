import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

import { init } from 'license-checker-rseidelsohn'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import pkgJson from '../package.json'

import { getManyDependencyInformation } from './utils/getManyDependencyInformation'
import { getManyUniqueDependencyNames } from './utils/getManyUniqueDependencyNames'
import { getPackageInformationMap } from './utils/getPackageInformationMap'
import { readPackageJsonFile } from './utils/readPackageJsonFile'
import { writeJsonFile } from './utils/writeJsonFile'

export function lice(start: string, outputFilePath: string, outputFileName?: string): void {
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
    async (err, moduleInfos) => {
      if (err) {
        throw err
      }

      if (!outputFilePath) {
        throw new Error('please specify where to create the file as third argument')
      }

      const startPkgFile = readFileSync(new URL(join(process.cwd(), start, 'package.json'), import.meta.url))
      const startPkg = JSON.parse(startPkgFile.toString())
      const defaultOutputFileName = `${startPkg?.name}@${startPkg?.version}.json`.replace('/', '-')

      const packageMap = getPackageInformationMap(moduleInfos)
      const dependencies = readPackageJsonFile(start)
      const uniqueDependencyNames = getManyUniqueDependencyNames(dependencies)
      const directDevDependencies = getManyDependencyInformation(packageMap, uniqueDependencyNames)

      return writeJsonFile(outputFilePath, directDevDependencies, outputFileName || defaultOutputFileName)
    },
  )
}

const argv = yargs(hideBin(process.argv))
  .scriptName('lice')
  .usage('Usage: $0 -i <inputFilePath> -o <outputFilePath> -n <outputFileName>')
  .option('inputFilePath', {
    alias: 'i',
    type: 'string',
    describe: 'The folder path of target package.json',
  })
  .option('outputFilePath', {
    alias: 'o',
    type: 'string',
    describe: 'The path to create the output file',
  })
  .option('outputFileName', {
    alias: 'n',
    type: 'string',
    describe: 'The name of the output file, defaults to package "{name}@{version}.json"',
  })
  .demandOption(['inputFilePath', 'outputFilePath'])
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', pkgJson.version)
  .alias('v', 'version')
  .argv

// @ts-expect-error - TS doesn't know that yargs will populate argv
lice(argv.inputFilePath, argv.outputFilePath, argv.outputFileName)
