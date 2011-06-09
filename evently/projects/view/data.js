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
  $$(this).project = project;
  
  return {
    format_date : function() {
        return function(text, render) {
            return Date.parseExact(render(text).replace(/\.\d+Z$/, 'Z'), ["yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd"]).toString("MMM d, yyyy");
        }
    },
    project : project,
    tasks : tasks
  };
};