angular.module("mpx-frontend-module-utils").filter 'userName', ->
  (user) ->
    return '' unless user

    "#{user.first_name} #{user.last_name}"
