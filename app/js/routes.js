define(function() {
  return Backbone.Router.extend({
    routes: {
      'lists/:id': 'openList'
    },

    initialize: function() {
    },

    openList: function(id) {
      if (pomodoit.collections.lists && pomodoit.collections.lists.length) {
        var list = pomodoit.collections.lists.get(id);
        if (list) {
          list.trigger('select');
        } else {
          console.error('List not found:', id);
        }
      }
    }
  });
});
