// Generated by CoffeeScript 1.10.0
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