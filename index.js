(function() {
  angular.module('mpx-frontend-module-utils', []);

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").factory('$arrayUtils', function() {
    var _index, add, dirty, insert, remove, replace;
    remove = function(arr, objects) {
      if (!_.isArray(objects)) {
        objects = [objects];
      }
      _.each(objects, function(obj) {
        var index;
        index = _index(arr, obj);
        if (index > -1) {
          return arr.splice(index, 1);
        }
      });
      return dirty(arr);
    };
    replace = function(arr, objects) {
      if (!_.isArray(objects)) {
        objects = [objects];
      }
      _.each(objects, function(obj) {
        var index;
        index = _index(arr, obj);
        if (index > -1) {
          return arr[index] = obj;
        }
      });
      return dirty(arr);
    };
    add = function(arr, objects) {
      if (!_.isArray(objects)) {
        objects = [objects];
      }
      _.each(objects, function(obj) {
        return arr.push(obj);
      });
      return dirty(arr);
    };
    insert = function(arr, objects) {
      if (!_.isArray(objects)) {
        objects = [objects];
      }
      _.each(objects, function(obj) {
        return arr.unshift(obj);
      });
      return dirty(arr);
    };
    dirty = function(arr) {
      return arr.$$id = arr.$$id | 0 + 1;
    };
    _index = function(arr, object) {
      return _.findIndex(arr, function(el) {
        return el['@id'] === object['@id'];
      });
    };
    return {
      remove: remove,
      replace: replace,
      add: add,
      insert: insert,
      dirty: dirty
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('capitalize', ["$filter", function($filter) {
    return function(string) {
      if (!string) {
        return '';
      }
      string = String(string);
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  }]);

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('undestroyed', function() {
    return function(collection) {
      return _.select(collection, function(item) {
        return !item._destroy;
      });
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('humanizeBinaryValue', function() {
    return function(bytes, unit, precision) {
      var exp, pre;
      if (!bytes) {
        return 'Unknown';
      }
      if (unit == null) {
        unit = 1000;
      }
      if (precision == null) {
        precision = 1;
      }
      if (bytes < unit) {
        return bytes + ' B';
      }
      exp = Math.floor(Math.log(bytes) / Math.log(unit));
      pre = ' ' + (unit === 1000 ? "kMGTPE" : "KMGTPE")[exp - 1] + (unit === 1000 ? "" : "i") + 'B';
      return (bytes / Math.pow(unit, exp)).toFixed(precision) + pre;
    };
  });

  angular.module("mpx-frontend-module-utils").filter('humanizeBytes', ["$filter", function($filter) {
    return function(bytes) {
      return $filter('humanizeBinaryValue')(bytes, 1000, 0);
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeBytesWithPrecision2', ["$filter", function($filter) {
    return function(bytes) {
      return $filter('humanizeBinaryValue')(bytes, 1000, 2);
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeDateTime2Row', ["$sce", function($sce) {
    return function(date, format) {
      if (date == null) {
        return 'No Data';
      }
      if (format === 'short') {
        return moment(date).utc().format("DD.MM.YYYY, HH:mm");
      } else {
        return $sce.trustAsHtml("<span class='nowrap'>" + (moment(date).utc().format("DD MMM YYYY")) + ", </span> <span class='nowrap'>" + (moment(date).utc().format("HH:mm [UTC]")) + "</span>");
      }
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeDateTime', function() {
    return function(date, format) {
      if (date == null) {
        return 'No Data';
      }
      if (format === 'short') {
        return moment(date).utc().format("DD.MM.YYYY, HH:mm");
      } else {
        return moment(date).utc().format("DD MMM YYYY, HH:mm [UTC]");
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('humanizeDate', function() {
    return function(date, format) {
      if (date == null) {
        return 'No Data';
      }
      if (format === 'short') {
        return moment.utc(date).format("DD.MM.YYYY");
      } else {
        return moment.utc(date).format("DD MMM YYYY");
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('humanizeLongNumber', function() {
    return function(val) {
      while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
      }
      return val;
    };
  });

  angular.module("mpx-frontend-module-utils").filter('humanizeSwapLongNumber', function() {
    return function(value, precision) {
      var exp, pre, unit;
      unit = 1000;
      if (precision == null) {
        precision = 1;
      }
      if (value < unit) {
        return value.toFixed(precision);
      }
      exp = Math.floor(Math.log(value) / Math.log(unit));
      pre = ' ' + "kMGTPE"[exp - 1];
      return (value / Math.pow(unit, exp)).toFixed(precision) + pre;
    };
  });

  angular.module("mpx-frontend-module-utils").filter('humanizeBoolean', ["$rootScope", function($rootScope) {
    return function(value) {
      var txt;
      txt = {
        "true": $rootScope.affiliationId === 'nbcu' ? 'Yes' : 'On',
        "false": $rootScope.affiliationId === 'nbcu' ? 'No' : 'Off'
      };
      if (value === true || value === 'true') {
        return txt["true"];
      } else {
        return txt["false"];
      }
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeLayerType', ["capitalizeFilter", function(capitalizeFilter) {
    return function(layerType) {
      if (!layerType) {
        return '';
      }
      layerType = _.last(layerType.split('/'));
      switch (layerType) {
        case 'itunes':
          return 'iTunes';
        default:
          return capitalizeFilter(layerType);
      }
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeClass', ["capitalizeFilter", function(capitalizeFilter) {
    return function(name) {
      if (!name) {
        return '';
      }
      return _.map(name.split('_'), capitalizeFilter).join(' ');
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeNamespacedClass', ["humanizeClassFilter", function(humanizeClassFilter) {
    return function(name) {
      if (!name) {
        return '';
      }
      return _.map(name.split('/'), humanizeClassFilter).join('/');
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeAssetType', ["capitalizeFilter", function(capitalizeFilter) {
    return function(name) {
      if (!name) {
        return '';
      }
      return (_.map(name.split('/'), function(x) {
        return capitalizeFilter(x);
      })).join(' / ');
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeAssetClassification', ["capitalizeFilter", function(capitalizeFilter) {
    return function(name) {
      if (!name) {
        return '';
      }
      return (_.map(name.split('_'), function(x) {
        return capitalizeFilter(x);
      })).join(' ');
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('humanizeJson', function() {
    return function(json) {
      if (!json) {
        return 'JSON is not available';
      }
      return JSON.stringify(json, null, 2);
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('join', function() {
    return function(values) {
      if (_.isArray(values)) {
        return values.join(', ');
      } else {
        return values;
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('join_or_empty', ["joinFilter", function(joinFilter) {
    return function(values) {
      if (_.isEmpty(values)) {
        return 'empty';
      } else {
        return joinFilter(values);
      }
    };
  }]);

  angular.module("mpx-frontend-module-utils").filter('join_on_name', function() {
    return function(values) {
      if (_.isArray(values)) {
        return _.map(values, 'name').join(', ');
      } else {
        return values;
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('join_on_id', function() {
    return function(values) {
      if (_.isArray(values)) {
        return _.map(values, 'id').join(',');
      } else {
        return values;
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('join_on_name_region', function() {
    return function(values) {
      var list;
      if (_.isArray(values)) {
        list = _.map(values, function(item) {
          if (_.isEmpty(item.region)) {
            return item.name;
          } else {
            return item.name + " (" + item.region + ")";
          }
        });
        return list.join(', ');
      } else {
        return values;
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('join_on_name_id', function() {
    return function(values) {
      var list;
      if (_.isArray(values)) {
        list = _.map(values, function(item) {
          return item.name + " (" + item.id + ")";
        });
        return list.join(', ');
      } else {
        return values;
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('user_full_name', function() {
    return function(value) {
      if (!_.isEmpty(value)) {
        return value.first_name + " " + value.last_name;
      } else {
        return null;
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('name_region', function() {
    return function(item) {
      if (!_.isEmpty(item)) {
        if (_.isEmpty(item.region)) {
          return item.name;
        } else {
          return item.name + " (" + item.region + ")";
        }
      } else {
        return null;
      }
    };
  });

  angular.module("mpx-frontend-module-utils").filter('name_id', function() {
    return function(item) {
      if (!_.isEmpty(item)) {
        return item.name + " (" + item.id + ")";
      } else {
        return null;
      }
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('parentChildTitle', ["$utils", function($utils) {
    return function(obj) {
      var ancestorTitles, fullTitle, parentTitle, title;
      if (obj.full_title === obj.display_title) {
        return obj.full_title;
      }
      ancestorTitles = obj.full_title.replace(" - " + obj.display_title, '');
      parentTitle = "<span class=\"parent-title\">" + ancestorTitles + "</span><br>";
      title = "<span class=\"title\">" + obj.display_title + "</span>";
      fullTitle = "" + parentTitle + title;
      return fullTitle;
    };
  }]);

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('sortById', function() {
    return function(collection) {
      return _.sortBy(collection, function(x) {
        return x.id;
      });
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").factory('$stringUtils', function() {
    var camelize, capitalize;
    capitalize = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    camelize = function(string) {
      return (_.map(string.split('_'), function(chunk) {
        return capitalize(chunk);
      })).join('');
    };
    return {
      camelize: camelize,
      capitalize: capitalize
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('translate', function() {
    return function(string) {
      var articles, conjunctions, extendWords, prepositions, specials, titleize, wordList, wordsRegex;
      string || (string = '');
      string = String(string);
      string = _.last(string.split('.'));
      prepositions = ["a", "abaft", "aboard", "about", "above", "absent", "across", "afore", "after", "against", "along", "alongside", "amid", "amidst", "among", "amongst", "an", "apropos", "apud", "around", "as", "aside", "astride", "at", "athwart", "atop", "barring", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "circa", "concerning", "despite", "down", "during", "except", "excluding", "failing", "following", "for", "forenenst", "from", "given", "in", "including", "inside", "into", "like", "mid", "midst", "minus", "modulo", "near", "next", "notwithstanding", "o'", "of", "off", "on", "onto", "opposite", "out", "outside", "over", "pace", "past", "per", "plus", "pro", "qua", "regarding", "round", "sans", "save", "since", "than", "through", "throughout", "thru", "thruout", "till", "times", "to", "toward", "towards", "under", "underneath", "unlike", "until", "unto", "up", "upon", "versus", "via", "vice", "vis-à-vis", "with", "within", "without", "worth"];
      articles = ["the", "a", "an", "some"];
      conjunctions = ["as", "because", "for", "and", "nor", "but", "or", "yet", "so"];
      extendWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
      specials = {
        itunes: 'iTunes'
      };
      wordList = prepositions.concat(articles).concat(conjunctions).concat(extendWords.source.replace(/(^\^\(|\)\$$)/g, '').split('|'));
      wordsRegex = new RegExp("^(" + wordList.join("|") + ")$", "i");
      titleize = function(string, smallWords) {
        return string.replace(/_/g, ' ').replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
          var lowercased;
          lowercased = match.toLowerCase();
          if (specials[lowercased]) {
            return specials[lowercased];
          }
          if (index > 0 && index + match.length !== title.length && match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && (title.charAt(index + match.length) !== "-" || title.charAt(index - 1) === "-") && title.charAt(index - 1).search(/[^\s-]/) < 0) {
            return lowercased;
          }
          if (match.substr(1).search(/[A-Z]|\../) > -1) {
            return match;
          }
          return match.charAt(0).toUpperCase() + match.substr(1);
        });
      };
      return titleize(string, wordsRegex);
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('trusted', ["$sce", function($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  }]);

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('trustedHtml', ["$sce", function($sce) {
    return function(value) {
      return $sce.trustAsHtml(value);
    };
  }]);

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('type', ["$utils", function($utils) {
    return function(obj) {
      return $utils.modelType(obj);
    };
  }]);

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('untitledFallback', function() {
    return function(value) {
      if (_.isEmpty(value)) {
        return '<UNTITLED>';
      }
      return value;
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('upcase', ["$filter", function($filter) {
    return function(string) {
      if (!string) {
        return '';
      }
      return String(string).toUpperCase();
    };
  }]);

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").filter('userName', function() {
    return function(user) {
      if (!user) {
        return '';
      }
      return user.first_name + " " + user.last_name;
    };
  });

}).call(this);

(function() {
  angular.module("mpx-frontend-module-utils").factory('$utils', function() {
    return {
      modelType: function(obj) {
        var type;
        type = _.isString(obj) ? obj : obj && obj['@type'];
        return type && _.last(type.split('/'));
      },
      modelSuperType: function(obj) {
        var type;
        type = _.isString(obj) ? obj : obj['@type'];
        return type.split('/')[1];
      },
      leadingZeroNo: function(num, size) {
        return ('000000000' + num).substr(-size);
      }
    };
  });

}).call(this);
