function(e, project_id) {
    var data = {
        mockups: 'http://',
        options: [
            {option: 'Prospect'},
            {option: 'Active'},
            {option: 'On Hold'},
            {option: 'Complete'}
        ]
    };

    if (project_id) {
        $$(this).app.db.openDoc(project_id, {
           success: function(doc) {
               doc.options = data.options;
               for (i in doc.options) {
                   if (doc.options[i].option == doc.status) {
                       doc.options[i].selected = true;
                   }
               }
               data = doc;
           }
        }, {async: false});
    }
    return data;
}