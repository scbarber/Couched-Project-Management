function(data) {
  // $.log(data)
  var project;
  var today = Date.today();
  var projects =  {
    projects : data.rows.map(function(r) {
        project = r.value;
        project.css_class = (today > Date.parse(project.due_date)) ? "overdue" : "";
        return project;
    })
  };
  return projects;
};