import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/commands/lice',
  ],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  clean: true,
})

/*
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/cli',
  ],
  rollup: {
    inlineDependencies: true,
    json: {
      compact: true,
      namedExports: false,
      preferConst: false,
    },
    commonjs: {
      requireReturnsDefault: 'auto',
    },
    dts: {
      respectExternal: false,
    },
  },
  clean: true,
  declaration: true,
})
*/
