angular.module("mpx-frontend-module-utils").filter 'capitalize', ($filter) ->
  (string) ->
    return '' unless string
    string = String(string)
    string.charAt(0).toUpperCase() + string.slice(1)
