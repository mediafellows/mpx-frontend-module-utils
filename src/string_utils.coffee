angular.module("mpx-frontend-module-utils").factory '$stringUtils', () ->
  capitalize = (string) ->
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  camelize = (string) ->
    (_.map string.split('_'), (chunk) -> capitalize(chunk)).join('')

  camelize: camelize
  capitalize: capitalize
