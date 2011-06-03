function(e, project_id) {
    var data = {
        action: 'Add',
        mockups: 'http://',
        options: [
            {option: 'Prospect'},
            {option: 'Active'},
            {option: 'On Hold'},
            {option: 'Complete'}
        ],
        submit: 'Add Project'
    };

    if (project_id) {
        $$(this).app.db.openDoc(project_id, {
           success: function(doc) {
               doc.options = data.options;
               data = doc;
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
    return data;
}