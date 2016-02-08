angular.module("mpx-frontend-module-utils").filter 'sortById', ->
  (collection) ->
    _.sortBy collection, (x) -> x.id
