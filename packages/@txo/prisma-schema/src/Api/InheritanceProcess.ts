/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-08T19:05:99+02:00
 * @Copyright: Technology Studio
**/

type Entity = { name: string, parentName?: string, content: string }

type Dependency = {
  name: string,
  children: Dependency[],
  depth: number,
}

const produceDependencyList = (entityMap: Record<string, Entity>): Dependency[] => {
  const dependencyMap: Record<string, Dependency> = {
  }

  const dependencyFactory = (name: string): Dependency => ({
    name,
    children: [],
    get depth () {
      return 1 + this.children.reduce((max: number, { depth }) => {
        return Math.max(max, depth)
      }, 0)
    },
  })
  Object.values(entityMap).forEach(({ name, parentName }) => {
    if (parentName) {
      let parentDependency = dependencyMap[parentName]
      let dependency = dependencyMap[name]
      if (!dependency) {
        dependency = dependencyFactory(name)
        dependencyMap[name] = dependency
      }
      if (!parentDependency) {
        parentDependency = dependencyFactory(parentName)
        dependencyMap[parentName] = parentDependency
      }
      parentDependency.children.push(dependency)
    }
  })
  return Object.values(dependencyMap).sort((left, right) => right.depth - left.depth)
}

const expandInheritance = (schema: string, dependency: Dependency): string => (
  dependency.children.reduce((schema, entity) => {
    const entityRegExp = new RegExp(`\n[^\n{]*${entity.name}[^\\w][^\n]*{[^\n]*[\n]`)
    const parentEntityAttributesRegExp = new RegExp(`(?<base>[^\n{]*${dependency.name}[^\\w][^\n]*{[^\n]*\n)(?<attributes>[^}]*)`)
    const parentEntityAttributesMatch = schema.match(parentEntityAttributesRegExp)
    const attributes = parentEntityAttributesMatch?.groups?.attributes
    const updatedSchema = schema.replace(entityRegExp, firstLine => (
      firstLine.replace(/(\s*\/\/)?\s*@inherits[^\n]*/, '') + (attributes ?? 'not-found')
    ))
    return updatedSchema
  }, schema)
)

const extractEntityMap = (schema: string): Record<string, Entity> => {
  const entityContentList = (schema.match(/(model|enum) [^{]*[^}]*\}/gs) ?? [])

  return entityContentList.reduce((entityMap: Record<string, Entity>, content) => {
    const match = content.match(
      /(model|enum)\s*(?<name>\w*)\s*\{\s*(\/\/\s*@inherits\s*(?<parentName>\w*))?/,
    )
    if (match?.groups) {
      const { name, parentName } = match.groups
      entityMap[name] = {
        name,
        parentName,
        content,
      }
    }
    return entityMap
  }, {})
}

export const processInheritance = (schema: string): string => {
  const entityMap = extractEntityMap(schema)

  return produceDependencyList(entityMap).reduce(expandInheritance, schema)
}
