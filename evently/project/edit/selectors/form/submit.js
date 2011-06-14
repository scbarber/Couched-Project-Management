function() {
    var form = $(this);
    var db = $$(this).app.db;
    var doc = $$('html').project;
    var fdoc = $(form).serializeObject();
    
    if (!doc) {
        doc = fdoc;
    } else {
        for (var item in fdoc) {
            if (item != '_attachments') {
                doc[item] = fdoc[item];
            }
        }
    }

    doc.type = "project";

    // Setup the tasks property/object
    if (!doc.tasks) {
        doc.tasks = {
            active: [],
            pending: [],
            complete: []
        }
        doc.progress = {
            string : "0 of 0",
            percent : "0"
        }
    }
    
    // Set some meta dates:
    if (!doc.created_on) {
        doc.created_on = new Date();
    }

    if (doc.status == "Active" && !doc.started_on) {
        doc.started_on = new Date();
    }

    if (doc.status == "Completed" && !doc.completed_on) {
        doc.completed_on = new Date();
    }

    db.saveDoc(doc, {
        success : function() {
            $("[name='_rev']", form).val(doc._rev);
            var attachments = $("input[name='_attachments']", form).val();
            if (attachments) {
                $(form).ajaxSubmit({
                   url: db.uri + $.couch.encodeDocId(doc._id) 
                });
            }
            form[0].reset();
            form.parent().html('');
        }
    });
    return false;
};
