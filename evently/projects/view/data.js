function(data) {
  // $.log(data)
  var project;
  var tasks = [];
  
  data.rows.map(function(r){
      if (r.value.type == 'project') {
          project = r.value;
      } else if(r.value.type == 'task') {
          tasks.push(r.value);
      }
  });
  
  $.log(project);
  
  return {
    project : project,
    tasks : tasks
  };
};