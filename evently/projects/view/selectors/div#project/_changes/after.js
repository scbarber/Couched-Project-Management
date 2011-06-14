function(data) {
  var project = $$('html').project; // Fetch the stored project
  var db = $$(this).app.db;
  $("#progressbar").progressbar({ value: project.progress.percent });
  $("div#tasks table tbody").sortable({
      start: function(event, ui) {
          ui.item[0].moveFrom = ui.item[0].rowIndex;
      },
      update: function(event, ui) {
          var moveFrom = ui.item[0].moveFrom;
          var moveTo = ui.item[0].rowIndex;
          var taskType = $(ui.item[0]).parents('table').eq(0).attr('class');
          var tasks = project.tasks[taskType];
          
          var task = tasks.splice(ui.item[0].moveFrom, 1)[0];
          tasks.splice(moveTo, 0, task);
          delete ui.item[0].moveFrom; // Cleanup after ourselves
          db.saveDoc(project);
      }
  });
};