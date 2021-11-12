export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
};

function query(entityType) {
  let entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return Promise.resolve(entities);
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity.id === entityId)
  );
}

function post(entityType, newEntity) {
  newEntity.id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    entities.push(...newEntities);
    _save(entityType, entities);
    return entities;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = findIdxById(entities, updatedEntity.id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = findIdxById(entities, entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function findIdxById(entities, entityId) {
  return entities.findIndex(({ id }) => id === entityId);
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
