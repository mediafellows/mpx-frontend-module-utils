angular.module("mpx-frontend-module-utils").filter 'undestroyed', ->
  (collection) ->
    _.select collection, (item) -> !item._destroy
