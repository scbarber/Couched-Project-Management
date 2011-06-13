function(){
    var project_id = $$('html').project._id;
    $(this).trigger('edit', project_id);
    return(false);
}