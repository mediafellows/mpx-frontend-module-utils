angular.module("mpx-frontend-module-utils").filter 'translate', ->
  (string) ->
    string ||= ''
    string = String(string)

    string = _.last(string.split('.'))

    prepositions = ["a", "abaft", "aboard", "about", "above", "absent", "across", "afore", "after", "against", "along", "alongside", "amid", "amidst", "among", "amongst", "an", "apropos", "apud", "around", "as", "aside", "astride", "at", "athwart", "atop", "barring", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "circa", "concerning", "despite", "down", "during", "except", "excluding", "failing", "following", "for", "forenenst", "from", "given", "in", "including", "inside", "into", "like", "mid", "midst", "minus", "modulo", "near", "next", "notwithstanding", "o'", "of", "off", "on", "onto", "opposite", "out", "outside", "over", "pace", "past", "per", "plus", "pro", "qua", "regarding", "round", "sans", "save", "since", "than", "through", "throughout", "thru", "thruout", "till", "times", "to", "toward", "towards", "under", "underneath", "unlike", "until", "unto", "up", "upon", "versus", "via", "vice", "vis-à-vis", "with", "within", "without", "worth"]
    articles = ["the", "a", "an", "some"]
    conjunctions = ["as", "because", "for", "and", "nor", "but", "or", "yet", "so"]
    extendWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i
    specials =
      itunes: 'iTunes'


    wordList = prepositions.concat(articles).concat(conjunctions).concat(extendWords.source.replace(/(^\^\(|\)\$$)/g, '').split('|'))
    wordsRegex = new RegExp("^(" + wordList.join("|") + ")$", "i")

    titleize = (string, smallWords) ->
      string.replace(/_/g, ' ').replace /[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (match, index, title) ->
        lowercased = match.toLowerCase()

        return specials[lowercased] if specials[lowercased]

        return lowercased if index > 0 and
          index + match.length isnt title.length and
          match.search(smallWords) > -1 and
          title.charAt(index - 2) isnt ":" and
          (title.charAt(index + match.length) isnt "-" or
          title.charAt(index - 1) is "-") and
          title.charAt(index - 1).search(/[^\s-]/) < 0

        return match if match.substr(1).search(/[A-Z]|\../) > -1
        return match.charAt(0).toUpperCase() + match.substr(1)

    titleize(string, wordsRegex)
