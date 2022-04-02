import packageJson from '../../package.json'
const dependencies = packageJson.dependencies
const devDependencies = packageJson.devDependencies


export const packages = Object.assign(dependencies, devDependencies)