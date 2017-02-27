angular.module("mpx-frontend-module-utils").filter 'humanizeBinaryValue', ->
  (bytes, unit, precision) ->
    return 'Unknown' unless bytes
    unit ?= 1000
    precision ?= 1

    if bytes < unit
      return bytes + ' B'

    exp = Math.floor(Math.log(bytes) / Math.log(unit))
    pre = ' ' + (if unit == 1000 then "kMGTPE" else "KMGTPE")[exp - 1] + (if unit == 1000 then "" else "i") + 'B'
    (bytes / Math.pow(unit, exp)).toFixed(precision) + pre



angular.module("mpx-frontend-module-utils").filter 'humanizeBytes', ($filter) ->
  (bytes) ->
    $filter('humanizeBinaryValue')(bytes, 1000, 0)



angular.module("mpx-frontend-module-utils").filter 'humanizeBytesWithPrecision2', ($filter) ->
  (bytes) ->
    $filter('humanizeBinaryValue')(bytes, 1000, 2)



angular.module("mpx-frontend-module-utils").filter 'humanizeDateTime2Row', ($sce) ->
  (date, format) ->
    return 'No Data' if !date?
    if format == 'short'
      moment(date).utc().format("DD.MM.YYYY, HH:mm")
    else
      $sce.trustAsHtml "
        <span class='nowrap'>#{moment(date).utc().format("DD MMM YYYY")}, </span>
        <span class='nowrap'>#{moment(date).utc().format("HH:mm [UTC]")}</span>
      "
      #moment(date).utc().format("DD MMM YYYY, HH:mm [UTC]")

angular.module("mpx-frontend-module-utils").filter 'humanizeDateTime', ->
  (date, format) ->
    return 'No Data' if !date?
    if format == 'short'
      moment(date).utc().format("DD.MM.YYYY, HH:mm")
    else
      moment(date).utc().format("DD MMM YYYY, HH:mm [UTC]")



angular.module("mpx-frontend-module-utils").filter 'humanizeDate', ->
  (date, format) ->
    return 'No Data' if !date?
    if format == 'short'
      moment.utc(date).format("DD.MM.YYYY")
    else
      moment.utc(date).format("DD MMM YYYY")



angular.module("mpx-frontend-module-utils").filter 'humanizeLongNumber', ->
  (val) ->
    while /(\d+)(\d{3})/.test(val.toString())
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2')
    val



angular.module("mpx-frontend-module-utils").filter 'humanizeSwapLongNumber', ->
  (value, precision) ->
    unit = 1000
    precision ?= 1

    if value < unit
      return value.toFixed(precision)

    exp = Math.floor(Math.log(value) / Math.log(unit))
    pre = ' ' + ("kMGTPE")[exp - 1]
    (value / Math.pow(unit, exp)).toFixed(precision) + pre

angular.module("mpx-frontend-module-utils").filter 'humanizeBoolean', ($rootScope) ->
  (value) ->
    # HACK: https://issues.mediapeers.com/issues/45509
    txt = 
      true: $rootScope.affiliationId === 'nbcu' ? 'Yes' : 'On'
      false: $rootScope.affiliationId === 'nbcu' ? 'No' : 'Off'
    if value == true || value == 'true' then txt.true else txt.false

angular.module("mpx-frontend-module-utils").filter 'humanizeLayerType', (capitalizeFilter) ->
  (layerType) ->
    return '' unless layerType
    layerType = _.last layerType.split('/')
    switch layerType
      when 'itunes'
        'iTunes'
      else
        capitalizeFilter(layerType)

angular.module("mpx-frontend-module-utils").filter 'humanizeClass', (capitalizeFilter) ->
  (name) ->
    return '' unless name
    _.map(name.split('_'), capitalizeFilter).join(' ')

angular.module("mpx-frontend-module-utils").filter 'humanizeNamespacedClass', (humanizeClassFilter) ->
  (name) ->
    return '' unless name
    _.map(name.split('/'), humanizeClassFilter).join('/')

angular.module("mpx-frontend-module-utils").filter 'humanizeAssetType', (capitalizeFilter) ->
  (name) ->
    return '' unless name
    (_.map name.split('/'), (x) -> capitalizeFilter(x)).join(' / ')

angular.module("mpx-frontend-module-utils").filter 'humanizeAssetClassification', (capitalizeFilter) ->
  (name) ->
    return '' unless name
    (_.map name.split('_'), (x) -> capitalizeFilter(x)).join(' ')

angular.module("mpx-frontend-module-utils").filter 'humanizeJson', () ->
  (json) ->
    return 'JSON is not available' unless json
    JSON.stringify(json, null, 2)
