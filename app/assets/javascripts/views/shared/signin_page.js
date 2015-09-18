Indoge.Views.SigninPage = Backbone.View.extend({
  template: JST["shared/signin_page"],

  initialize: function(options) {
    this.callback = options.callback;
    this.listenTo(Indoge.currentUser, "signin", this.signinCallback);
  },

  events: {
    "submit form": "signin"
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  signin: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();
    
  },

  // if some action was specified, like going to employer profile, then do that
  // otherwise redirect to jobs_landing
  signinCallback: function() {
    if (this.callback) {
      this.callback();
    }
    else {
      Backbone.history.navigate("", {trigger: true});
    }
  }
})
