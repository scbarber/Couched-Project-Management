function(data) {
  // $.log(data)
  var project = {};
  var tasks = [];
  var db = $$(this).app.db;

  data.rows.map(function(r){
      if (r.value.type == 'project') {
          project = r.value;
          if (project._attachments) {
              for (i in project._attachments)
                  project.proposal = ['', db.name, project._id, i].join('/');
          }
      } else if(r.value.type == 'task') {
          tasks.push(r.value);
      }
  });

  // Save the project in the DOM
  $$('html').project = project;
  
  return {
    format_date : function() {
        return function(text, render) {
            return Date.parseExact(render(text).replace(/\.\d+Z$/, 'Z'), ["yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd"]).toString("MMM d, yyyy");
        }
    },
    has_active_tasks : function() {
        return this.active.length !== 0;
    },
    has_pending_tasks : function() {
        return this.pending.length !== 0;
    },
    has_complete_tasks : function() {
        return this.complete.length !== 0;
    },
    project : project,
    tasks : tasks
  };
};