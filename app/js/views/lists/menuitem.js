define(['text!templates/lists/menuitem.html', 'views/tasks/index', 'collections/tasks'], function(template, TasksIndexView, Tasks) {
  var ListMenuItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-menu-item',

    template: _.template(template),

    events: {
      'click': 'open'
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
      this.model.on('select', this.open, this);
    },

    render: function() {
      var $el = $(this.el);
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    open: function() {
      if (pomodoit.views.activeListMenuItem) {
        pomodoit.views.activeListMenuItem.$el.removeClass('active');
      }

      pomodoit.views.activeListMenuItem = this;
      this.$el.addClass('active');

      // Render the tasks
      if (pomodoit.views.tasksIndexView) {
        pomodoit.views.tasksIndexView.remove();
      }

      var tasks = new Tasks({ tasklist: this.model.get('id') });
      pomodoit.collections.tasks = tasks;
      pomodoit.views.tasksIndexView = new TasksIndexView({ collection: tasks, model: this.model });
      pomodoit.views.app.$el.find('#tasks-container').html(pomodoit.views.tasksIndexView.render().el);
      pomodoit.routes.navigate('lists/' + this.model.get('id'));

      return false;
    }
  });

  return ListMenuItemView;
});
