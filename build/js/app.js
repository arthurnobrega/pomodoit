define([
  'gapi'
, 'routes'
, 'views/app'
, 'views/auth'
, 'views/lists/menu'
, 'collections/tasklists'
, 'collections/tasks'
, 'models/timer'
],

function(ApiManager, Routes, AppView, AuthView, ListMenuView, TaskLists, Tasks, Timer) {
  var App = function() {
    this.routes = new Routes();

    this.collections.lists = new TaskLists();
    this.views.app = new AppView();
    this.views.app.render();
    this.views.auth = new AuthView(this);
    this.views.auth.render();
    this.views.listMenu = new ListMenuView({ collection: this.collections.lists });
    this.timer = new Timer();

    this.connectGapi();
  };

  App.prototype = {
    views: {},
    collections: {},
    timer: null,
    connectGapi: function() {
      var self = this;
      this.apiManager = new ApiManager(this);
      this.apiManager.on('ready', function() {
        self.collections.lists.fetch({ data: { userId: '@me' }, success: function(collection, res, req) {
          self.views.listMenu.render();
          Backbone.history.start();
        }});
      });
    }
  };

  return App;
});
