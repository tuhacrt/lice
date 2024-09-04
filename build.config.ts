import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/lice',
  ],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  clean: true,
})
