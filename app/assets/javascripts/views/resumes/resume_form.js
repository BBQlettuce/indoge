Indoge.Views.ResumeForm = Backbone.View.extend({
  template: JST["resumes/resume_form"],

  events: {
    "submit form": "saveResume"
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, "sync", this.render);
  },

  render: function() {
    this.$el.html(this.template({user: this.user}));
    return this;
  },

  saveResume: function() {
    e.preventDefault();
    debugger
    var data = $(e.currentTarget).serializeJSON();
    this.user.resume().set(data);
    this.user.resume().save({}, {
      success: function() {
        Backbone.history.navigate("myprofile", {trigger: true});
      },
      error: function() {
        console.log("huehuehue");
      }
    })
  }
})
