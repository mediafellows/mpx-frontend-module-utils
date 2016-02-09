angular.module("mpx-frontend-module-utils").factory '$viewUtils', ->
  uncheckAll: ->
    $('.checker .checked').removeClass('checked')
