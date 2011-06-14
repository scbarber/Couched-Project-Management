function() {
    var db = $$(this).app.db;
    var select = $("div#add-new-task form select[name='status']").clone();
    $(this).parents().eq(0).html(select);

    var status = $(select).parents('table').eq(0).attr('class');
    $(select).val(status);
    
    $(select).change(function () {
        var project = $$('html').project; // Fetch the stored project

        var oldStatus = $(this).parents('table').eq(0).attr('class');
        var newStatus = $(this).val();
        var index = $(this).parents('tr').eq(0)[0].rowIndex;
        // $.log("Move item #" + index + " from " + oldStatus + " tasks to the " + newStatus + " tasks");

        var tasks = project.tasks[oldStatus];
        var task = tasks.splice(index, 1)[0];
        
        if (newStatus == "active") {
            if (task.completed_on) delete task.completed_on;
            if (task.set_pending_on) delete task.set_pending_on;
        } else if (newStatus == "pending") {
            task.set_pending_on = new Date();
            if (task.completed_on) delete task.completed_on;
        } else if (newStatus == "complete") {
            task.completed_on = new Date();
            if (task.set_pending_on) delete task.set_pending_on;
        }
        
        $.log(task);
        
        project.tasks[newStatus].push(task);
        db.saveDoc(project);
    });
}