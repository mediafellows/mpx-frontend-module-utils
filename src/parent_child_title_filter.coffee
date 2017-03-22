angular.module("mpx-frontend-module-utils").filter 'parentChildTitle', ($utils) ->
  (obj) ->
    return obj.full_title if obj.full_title == obj.display_title
    ancestorTitles = obj.full_title.replace(" - #{obj.display_title}", '')
    parentTitle = null
    if ancestorTitles
      parentTitle = "<span class=\"parent-title\">#{ancestorTitles}</span><br>"
    title = "<span class=\"title\">#{obj.display_title}</span>"
    fullTitle = ''
    fullTitle = parentTitle if parentTitle?
    fullTitle += title
    fullTitle
