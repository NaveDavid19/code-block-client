export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}
export type Block = {
  _id: string
  title: string
  initialTemplate: string
  value: string
  visitorCounter: number
  solution: string
}

function query(entityType: string, delay = 1000): Promise<Block[]> {
  const entities = JSON.parse(localStorage.getItem(entityType) || '[]')
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

function get(entityType: string, entityId: string): Promise<Block> {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity: Block) => entity._id === entityId)
    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    return entity
  })
}

function post(entityType: string, newEntity: Block): Promise<Block> {
  newEntity = { ...newEntity }
  newEntity._id = _makeId()
  return query(entityType).then((entities: Block[]) => {
    entities.unshift(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function put(entityType: string, updatedEntity: Block) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType: string, entityId: string) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

// Private functions

function _save(entityType: string, entities: Block[]) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
