angular.module("mpx-frontend-module-utils").filter 'untitledFallback', () ->
  (value) ->
    return '<UNTITLED>' if _.isEmpty(value)
    value
