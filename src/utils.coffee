angular.module("mpx-frontend-module-utils").factory '$utils', () ->
  modelType: (obj) ->
    type = if _.isString(obj) then obj else (obj && obj['@type'])
    type && _.last type.split('/')

  modelSuperType: (obj) ->
    type = if _.isString(obj) then obj else obj['@type']
    type.split('/')[1]

  # helper method to produce zero filled integer numbers
  # e.g. 0002
  leadingZeroNo: (num, size) -> ('000000000' + num).substr(-size)
