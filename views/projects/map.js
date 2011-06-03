function(doc) {
  if (doc.type == "project") {
    emit(doc.status, doc);
  }
};