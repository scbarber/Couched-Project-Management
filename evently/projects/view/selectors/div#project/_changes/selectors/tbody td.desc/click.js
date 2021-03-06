function() {
    var project = $$('html').project; // Fetch the stored project
    var db = $$(this).app.db;

    var input = $("div#add-new-task form input[name='description']").clone();
    $(this).html(input);

    var status = $(input).parents('table').eq(0).attr('class');
    var index = $(this).parents('tr').eq(0)[0].rowIndex;

    var task = project.tasks[status][index];

    $(input).val(task.description);
    $(input).focus();
    
    var saveTask = function() {
        task.description = $(this).val();
        db.saveDoc(project);
    };
    
    $(input).blur(saveTask);
    $(input).change(saveTask);
}