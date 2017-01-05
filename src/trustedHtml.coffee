angular.module("mpx-frontend-module-utils").filter 'trustedHtml', ($sce) ->
  (value) ->
    $sce.trustAsHtml(value)
