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
        // Resetting dates
        if (task.completed_on) delete task.completed_on;
        if (task.set_pending_on) delete task.set_pending_on;

        doc.tasks.active.push(task);
    } else if (status == "pending") {
        task.set_pending_on = new Date();
        if (task.completed_on) delete task.completed_on;

        doc.tasks.pending.push(task);
    } else if (status == "complete") {
        task.completed_on = new Date();
        if (task.set_pending_on) delete task.set_pending_on;

        doc.tasks.complete.push(task);
    }
    
    // Figure out how much we have progressed on this project
    doc.progress = {
        string : doc.tasks.complete.length + " of " + (doc.tasks.active.length + doc.tasks.pending.length + doc.tasks.complete.length),
        percent : parseInt((doc.tasks.complete.length / (doc.tasks.active.length + doc.tasks.pending.length + doc.tasks.complete.length)) * 100)
    }
    
    db.saveDoc(doc, {
        success : function() {
            form[0].reset();
            form.parent().toggle();
        }
    });
    return false;
};
