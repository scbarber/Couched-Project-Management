function(doc) {
  if (doc.type == "project" && doc.status == "Active") {
    emit(doc.due_date, doc);
  }
};