//= require jqueryManifest
//= require bootstrapManifest
//= require underscore
//= require underscore.string.min
//= require backbone
//= require baseClasses
//= require_tree ./models
//= require_tree ./views
//= require_tree ./collections
//= require router

// bootstrap hack to stop dropdowns from disappearing on mobile
$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });

(function(App) {

  _.extend(App, {

    init: function() {
      var _this = this;
      $( function() {
        _this.dispatcher = _.extend({}, Backbone.Events);

        $('#logoutButton').on('click', function(e) {
          e.preventDefault();
          _this.logout();
        });

        _this.setupCurrentUser( function (status) {
          App.user = status;
          _this.router = new App.Routers.Router();
        });

      });
    },

    //////////
    // user init
    //////////
    setSignedIn: function() {
      $('#currentUser').text(this.user.get('name'));
      $('body').removeClass('noUser').addClass('hasUser');
    },

    setSignedOut: function() {
      this.user.clear();
      $('body').removeClass('hasUser').addClass('noUser');
    },

    setupCurrentUser: function(cb) {
      var _this = this;

      this.user = new App.Models.Me();
      this.user.fetch({
        success: function(user) {
          _this[user.id ? 'setSignedIn' : 'setSignedOut']();
          $('body').removeClass('userNotFetched');
          cb(user);
        },
        error: function(error) {
          cb(false);
        }
      });
    },

    authSuccess: function() {
      this.setupCurrentUser(function(status) {
        console.log('authSuccess: ' + status);
      });
      $('#signInModal').modal('hide');
    },

    authFailure: function() {
      alert('TODO: Implement App.authFailure()');
    },

    logout: function() {
      var _this = this;

      $.ajax({
        url: '/auth/logout',
        success: function() {
          _this.setSignedOut();
        }
      });
    }

  });

  App.init();

})(window.App);
