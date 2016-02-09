angular.module("mpx-frontend-module-utils").factory '$arrayUtils', ->
  remove = (arr, objects) ->
    objects = [objects] unless _.isArray(objects)
    _.each objects, (obj) ->
      index = _index(arr, obj)
      arr.splice(index, 1) if index > -1
    dirty(arr)

  replace = (arr, objects) ->
    objects = [objects] unless _.isArray(objects)
    _.each objects, (obj) ->
      index = _index(arr, obj)
      arr[index] = obj if index > -1

    dirty(arr)

  add = (arr, objects) ->
    objects = [objects] unless _.isArray(objects)
    _.each objects, (obj) -> arr.push(obj)

    dirty(arr)

  insert = (arr, objects) ->
    objects = [objects] unless _.isArray(objects)
    _.each objects, (obj) -> arr.unshift(obj)

    dirty(arr)

  dirty = (arr) ->
    arr.$$id = arr.$$id |0 + 1

  _index = (arr, object) ->
    _.findIndex arr, (el) -> el['@id'] == object['@id']


  # interface
  remove: remove
  replace: replace
  add: add
  insert: insert
  dirty: dirty
