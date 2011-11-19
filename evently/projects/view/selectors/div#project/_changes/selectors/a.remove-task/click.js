function(){
    if (!confirm("Delete this task?")) return(false);
    
    var db = $$(this).app.db;
    var project = $$('html').project; // Fetch the stored project
    var index = $(this).parents('tr').eq(0)[0].rowIndex;
    var status = $(this).parents('table').eq(0).attr('class');
    
    // $.log("Remove task #" + index + " from the " + status + " tasks.");
    project.tasks[status].splice(index, 1);
    
    // Figure out how much we have progressed on this project
    project.progress = {
        string : project.tasks.complete.length + " of " + (project.tasks.active.length + project.tasks.pending.length + project.tasks.complete.length),
        percent : parseInt((project.tasks.complete.length / (project.tasks.active.length + project.tasks.pending.length + project.tasks.complete.length)) * 100)
    }
    
    db.saveDoc(project);

    return(false);
}