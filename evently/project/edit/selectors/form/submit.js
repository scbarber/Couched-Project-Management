function() {
    var form = $(this);
    var db = $$(this).app.db;
    var doc = $(form).serializeObject();
    doc.created_at = new Date();
    doc.type = "project";
    if (!doc._rev) {
        delete doc._rev;
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
