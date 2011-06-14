function(e, project_id) {
    var data = {
        action: 'Add',
        project: {},
        options: [],
        submit: 'Add Project'
    };

    var options = $$(this).app.ddoc.statuses.project;
    for (var o in options) {
        data.options[o] = { "option": options[o].option };
    }

    if (project_id) {
        $$(this).app.db.openDoc(project_id, {
           success: function(doc) {
               data.project = doc;
               for (i in data.options) {
                   if (data.options[i].option == doc.status) {
                       data.options[i].selected = true;
                   }
               }
               data.action = 'Edit';
               data.submit = 'Save Project';
           }
        }, {async: false});
    }
    
    // Store the project in the DOM in order to save data not in the form
    if (data.project._id) $$('html').project = data.project;
    
    return data;
}