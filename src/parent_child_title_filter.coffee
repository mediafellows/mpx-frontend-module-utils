angular.module("mpx-frontend-module-utils").filter 'parentChildTitle', ($utils) ->
  (obj) ->
    return obj.full_title if obj.full_title == obj.display_title
    ancestorTitles = obj.full_title.replace(" - #{obj.display_title}", '')
    parentTitle = """<span class="parent-title">#{ancestorTitles}</span><br>"""
    title = """<span class="title">#{obj.display_title}</span>"""
    fullTitle = "#{parentTitle}#{title}"
    fullTitle
