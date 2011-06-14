function(e, r) {
    var form = $(this);
    var db = $$(this).app.db;
    var doc = $$('html').project;
    var task = $(form).serializeObject();
    
    task.created_at = new Date();
    var status = task.status;
    delete task.status; // We don't need to store this
    
    // TODO find and store the user who created this (see vendor/couchapp/evently/profile/loggedIn.js)
    
    if (status == "active") {
        doc.tasks.active.push(task);

        // Resetting dates
        if (task.completed_on) delete task.completed_on;
        if (task.set_pending_on) delete task.set_pending_on;
    } else if (status == "pending") {
        doc.tasks.pending.push(task);
        task.set_pending_on = new Date();

        if (task.completed_on) delete task.completed_on;
    } else if (status == "complete") {
        doc.tasks.complete.push(task);
        task.completed_on = new Date();

        if (task.set_pending_on) delete task.set_pending_on;
    }
    
    db.saveDoc(doc, {
        success : function() {
            form[0].reset();
            form.parent().toggle();
        }
    });
    return false;
};
