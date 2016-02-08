angular.module("mpx-frontend-module-utils").filter 'join', ->
  (values) ->
    if _.isArray(values)
      values.join(', ')
    else
      values

angular.module("mpx-frontend-module-utils").filter 'join_or_empty', (joinFilter) ->
  (values) ->
    if _.isEmpty(values)
      'empty'
    else
      joinFilter(values)

angular.module("mpx-frontend-module-utils").filter 'join_on_name', ->
  (values) ->
    if _.isArray(values)
      _.map(values, 'name').join(', ')
    else
      values

angular.module("mpx-frontend-module-utils").filter 'join_on_id', ->
  (values) ->
    if _.isArray(values)
      _.map(values, 'id').join(',')
    else
      values

angular.module("mpx-frontend-module-utils").filter 'join_on_name_region', ->
  (values) ->
    if _.isArray(values)
      list = _.map values, (item) ->
        if _.isEmpty(item.region)
          item.name
        else
          "#{item.name} (#{item.region})"

      list.join(', ')
    else
      values

angular.module("mpx-frontend-module-utils").filter 'join_on_name_id', ->
  (values) ->
    if _.isArray(values)
      list = _.map values, (item) ->
        "#{item.name} (#{item.id})"

      list.join(', ')
    else
      values

angular.module("mpx-frontend-module-utils").filter 'user_full_name', ->
  (value) ->
    if !_.isEmpty(value)
      "#{value.first_name} #{value.last_name}"
    else
      null

angular.module("mpx-frontend-module-utils").filter 'name_region', ->
  (item) ->
    if !_.isEmpty(item)
      if _.isEmpty(item.region)
        item.name
      else
        "#{item.name} (#{item.region})"
    else
      null

angular.module("mpx-frontend-module-utils").filter 'name_id', ->
  (item) ->
    if !_.isEmpty(item)
      "#{item.name} (#{item.id})"
    else
      null
