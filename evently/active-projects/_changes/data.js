function(data) {
  // $.log(data)
  var project;
  var today = Date.today();
  return {
    projects : data.rows.map(function(r) {
        project = r.value;
        project.css_class = (today > Date.parse(project.due_date)) ? "overdue" : "";
        return project;
    })
  }
};