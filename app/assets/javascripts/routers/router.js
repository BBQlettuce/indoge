Indoge.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.jobs = options.jobs;
    this.resumes = options.resumes;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "jobsLanding",
    "signin": "signin",
    "signup": "signup",
    "jobs": "jobsIndex",
    "job/new": "jobNew",
    "job/:id": "jobShow",
    "resumes": "resumesLanding",
    "resumes/index": "resumesIndex",
    "resumes/:id": "resumeShow",
    "myprofile": "employeeProfile",
    "hire": "employerProfile",
    "myresume": "resumeForm"
  },

  signin: function(callback) {
    if (!this._requireSignedOut(callback)) {
      return;
    }
    var view = new Indoge.Views.SigninPage({callback: callback});
    this._swapView(view);
  },

  signup: function() {
    if (!this._requireSignedOut()) {
      return;
    };
    var view = new Indoge.Views.SignupPage();
    this._swapView(view);
  },

  jobsLanding: function() {
    var view = new Indoge.Views.JobsLanding();
    this._swapView(view);
  },

  jobsIndex: function() {
    this.jobs.fetch();
    var view = new Indoge.Views.JobsIndex({jobs: this.jobs});
    this._swapView(view);
  },

  resumesLanding: function() {
    var view = new Indoge.Views.ResumesLanding();
    this._swapView(view)
  },

  resumesIndex: function() {
    this.resumes.fetch({reset: true});
    var view = new Indoge.Views.ResumesIndex({resumes: this.resumes});
    this._swapView(view);
  },

  employeeProfile: function() {
    var callback = this.employeeProfile.bind(this);
    if (!this._requireSignedIn(callback)) {
      return;
    };
    Indoge.currentUser.fetch();
    var view = new Indoge.Views.EmployeeProfile({user: Indoge.currentUser});
    this._swapView(view);
  },

  employerProfile: function() {
    var callback = this.employerProfile.bind(this);
    if (!this._requireSignedIn(callback)) {
      return;
    };
    Indoge.currentUser.fetch();
    var view = new Indoge.Views.EmployerProfile({user: Indoge.currentUser});
    this._swapView(view);
  },

  jobNew: function() {
    var callback = this.employerProfile.bind(this);
    if (!this._requireSignedIn(callback)) {
      return;
    };
    var newJob = new Indoge.Models.Job();
    Indoge.currentUser.fetch();
    var view = new Indoge.Views.JobNew({user: Indoge.currentUser, jobs: this.jobs, model: newJob});
    this._swapView(view);
  },

  jobShow: function(id) {
    var job = this.jobs.getOrFetch(id);
    var view = new Indoge.Views.JobShow({job: job});
    this._swapView(view);
  },

  resumeForm: function() {
    var callback = this.employeeProfile.bind(this);
    if (!this._requireSignedIn(callback)) {
      return;
    };
    Indoge.currentUser.fetch();
    var view = new Indoge.Views.ResumeForm({user: Indoge.currentUser});
    this._swapView(view);
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(this._currentView.render().$el);
  },

  _requireSignedIn: function(callback) {
    if (!Indoge.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signin(callback);
      return false;
    }
    return true;
  },

  _requireSignedOut: function(callback) {
    if (Indoge.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }
    return true;
  },

  _goHome: function() {
    Backbone.history.navigate("", { trigger: true });
  }

})
