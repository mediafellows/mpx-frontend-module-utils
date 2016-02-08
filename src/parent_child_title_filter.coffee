angular.module("mpx-frontend-module-utils").filter 'parentChildTitle', ($utils) ->
  (obj) ->
    pattern = /^(.*) - (.*) (\([0-9/].+\))/
    fullTitleParts = pattern.exec(obj.full_title)
    return obj.full_title if !fullTitleParts?
    parentTitle = "<span class=\"parent-title\">#{fullTitleParts[1]}</span><br>" || null
    title = "<span class=\"title\">#{fullTitleParts[2]} #{fullTitleParts[3]}</span>"
    fullTitle = ''
    fullTitle = parentTitle if parentTitle?
    fullTitle += title
    fullTitle
