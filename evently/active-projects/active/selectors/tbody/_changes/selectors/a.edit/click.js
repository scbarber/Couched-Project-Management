function(){
    var project_id = $(this).parents('tr').eq(0).attr('id');
    $(this).trigger('edit', project_id);
    return(false);
}