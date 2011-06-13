function(e) {
    var args = e.data.args;
    var id = args[args.length - 1].id;
    return {
      "view" : "view-project",
      "key" : id
    }
}