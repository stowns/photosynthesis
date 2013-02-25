(function(App) {

  App.Routers.Router = App.Routers.Base.extend({
    routes: {
    "": "index",
    "me": "me", 
    "contact" : "contact",
    "about" : "about",
    "services" : "services",
    "example-dishes" : "examples"
    }, 

    initialize: function() {
      Backbone.history.start({ pushState: true, hashChange: false });
    },

    me: function() {
      console.log('/me');
      _this = this;

      this.meView = new App.Views.MeView({ model : App.user });
      this.meView.render();

      if (App.user == false) return false;
    },

    contact: function() {
      console.log('/contact');
      this.activate('#contact');

      $('#send-mail').on('click', function(e) {
        e.preventDefault();
        var data = {
          name : $("input[name='name']").val(),
          from : $("input[name='email']").val(),
          phone : $("input[name='phone']").val(),
          message : $("textarea").val()
        }
        $.getJSON("/api/mail", data, function(json) {
          $('.center').notify({
            message: { text: "Thanks " + json.name + "!  You'll be hearing from me soon!" }
          }).show();
          $("input[name='name']").val('');
          $("input[name='email']").val('');
          $("input[name='phone']").val('');
          $("textarea").val('');
        })
        .error(function() { alert("error sending email"); });
      });
    },

    about: function() {
      console.log('/about');
      this.activate('#about');
    },

    services: function() {
      console.log('/services');
      this.activate('#services');
    },

    examples: function() {
      console.log('/example-dishes');
      this.activate('#example-dishes');
    },

    index: function() {
      console.log('/');
      this.homeView = new App.Views.HomeView();
      this.homeView.render();
    }, 

    activate: function(page) {
      $(page).addClass('active');
    }

  });

})(window.App);