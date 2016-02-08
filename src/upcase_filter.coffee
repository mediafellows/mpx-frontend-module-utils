angular.module("mpx-frontend-module-utils").filter 'upcase', ($filter) ->
  (string) ->
    return '' unless string
    String(string).toUpperCase()
