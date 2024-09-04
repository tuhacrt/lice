import { expect, it } from 'vitest'

import { getManyDependencyInformation } from './getManyDependencyInformation'

it('should return dependency information', () => {
  const packageMap = new Map([
    ['dependency1', { name: 'dependency1', version: '1.0.1', licenses: 'MIT', repository: '', licenseText: '123', fromLicense: true }],
    ['dependency2', { name: 'dependency2', version: '2.0.0', licenses: 'Apache-2.0', repository: '', licenseText: '', fromLicense: false }],
  ])
  const dependencyNames = ['dependency1', 'dependency2']

  expect(getManyDependencyInformation(packageMap, dependencyNames))
    .toEqual(expect.arrayContaining([
      { name: 'dependency1', version: '1.0.1', license: 'MIT', repository: '', licenseText: '123' },
      { name: 'dependency2', version: '2.0.0', license: 'Apache-2.0', repository: '' },
    ]))
})
