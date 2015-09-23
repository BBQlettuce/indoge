Indoge.Views.JobsSearch = Backbone.CompositeView.extend({
  template: JST["jobs/jobs_search"],

  className: "content",

  events: {
    "click .prev-page" : "prevPage",
    "click .next-page" : "nextPage"
  },

  initialize: function(options) {
    this.jobs = options.jobs;
    this.listenTo(this.jobs, "sync", this.render);
    this.listenTo(this.jobs, "add", this.addJobView);
    this.listenTo(this.jobs, "remove", this.removeJobView);

    this.addSearchbar();
    this.jobs.each(this.addJobView.bind(this));
  },

  render: function() {
    this.$el.html(this.template({jobs: this.jobs}));
    this.attachSubviews();
    return this;
  },

  addJobView: function(job) {
    var subview = new Indoge.Views.JobMiniShow({model: job});
    this.addSubview(".jobs-list", subview);
  },

  removeJobView: function(job) {
    this.removeModelSubview(".jobs-list", job)
  },

  addSidebar: function() {

  },

  addSearchbar: function() {
    var subview = new Indoge.Views.SearchBar();
    this.addSubview(".search-bar", subview);
  },

  prevPage: function(e) {
    e.preventDefault();
    // if (Indoge.jobSearchResults.page <= 1) {
    //   alert("can't go any more previous");
    //   return;
    // }
    this.jobs.fetch({
      data: {
        what: this.jobs.query,
        page: this.jobs.page - 1
      },
      success: function() {
        if (this.jobs.page > 1) {
          this.jobs.page --;
        }.bind(this)
      }
    })
  },

  nextPage: function(e) {
    e.preventDefault();
    // if (Indoge.jobSearchResults.page === Indoge.jobSearchResults.numPages) {
    //   alert("can't go any further");
    //   return
    // }
    this.jobs.fetch({
      data: {
        what: this.jobs.query,
        page: this.jobs.page + 1
      },
      success: function() {
        this.jobs.page ++;
      }.bind(this)
    })
  }
})

        // <% for(var i = 1; i <= Indoge.jobSearchResults.) %>
