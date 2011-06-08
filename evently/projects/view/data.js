function(data) {
  // $.log(data)
  var project;
  var tasks = [];
  var date;
  
  data.rows.map(function(r){
      if (r.value.type == 'project') {
          project = r.value;
      } else if(r.value.type == 'task') {
          tasks.push(r.value);
      }
  });
  
  return {
    date : function() {
        return function(text, render) {
            return Date.parseExact(render(text).replace(/\.\d+Z$/, 'Z'), ["yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd"]).toString("MMM d, yyyy");
        }
    },
    project : project,
    tasks : tasks
  };
};