(function(App) {

  App.Views.SignInModal = App.Views.BaseModeless.extend({

    el: $('#signIn'),
    template: 'users/signInModal'

  });

})(window.App);