function(data) {
    data.rows.map(function(r) {
        project = r.value;
        $("tr#" + project._id + " .progressbar").progressbar({value: project.progress.percent});
    });
}