type PackageJson = {
  devDependencies: Record<string, string>
  dependencies: Record<string, string>
}

export function getManyUniqueDependencyNames(packageJson: PackageJson): Array<string> {
  const devDependencies = Object.keys(packageJson.devDependencies)
  const dependencies = Object.keys(packageJson.dependencies)

  return [...new Set([...dependencies, ...devDependencies])]
}
