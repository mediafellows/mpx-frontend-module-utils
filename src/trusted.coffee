angular.module("mpx-frontend-module-utils").filter 'trusted', ($sce) ->
  (url) ->
    $sce.trustAsResourceUrl(url)
