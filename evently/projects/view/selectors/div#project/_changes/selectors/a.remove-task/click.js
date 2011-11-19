function(){
    if (!confirm("Delete this task?")) return(false);
    
    var db = $$(this).app.db;
    var project = $$('html').project; // Fetch the stored project
    var index = $(this).parents('tr').eq(0)[0].rowIndex;
    var status = $(this).parents('table').eq(0).attr('class');
    
    // $.log("Remove task #" + index + " from the " + status + " tasks.");
    project.tasks[status].splice(index, 1);
    
    db.saveDoc(project);

    return(false);
}