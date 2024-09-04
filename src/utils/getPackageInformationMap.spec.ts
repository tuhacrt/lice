import { expect, it } from 'vitest'

import { getPackageInformationMap } from './getPackageInformationMap'

it('should return dependency information', () => {
  const packages = {
    'package1@1.0.0': {
      name: 'package1',
      licenseFile: 'path/to/package1/license',
      licenseText: 'MIT',
      repository: '',
      version: '1.0.0',
    },
    'package2@2.0.0': {
      licenseFile: 'path/to/package2/license',
      licenseText: 'Apache-2.0',
      repository: '',
      version: '2.0.0',
    },
  }

  expect(getPackageInformationMap(packages))
    .toEqual(new Map([
      ['package1', { licenseFile: 'path/to/package1/license', licenseText: 'MIT', repository: '', version: '1.0.0', fromLicense: true }],
      ['package2@2.0.0', { licenseFile: 'path/to/package2/license', licenseText: 'Apache-2.0', repository: '', version: '2.0.0', fromLicense: true }],
    ]))
})
