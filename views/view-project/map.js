function(doc) {
    if (doc.type == "project") {
        emit(doc._id, doc);
    } else if (doc.type == "task") {
        emit(doc.project_id, doc);
    }
}