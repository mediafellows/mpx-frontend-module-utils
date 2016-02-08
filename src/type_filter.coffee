angular.module("mpx-frontend-module-utils").filter 'type', ($utils) ->
  (obj) -> $utils.modelType(obj)
