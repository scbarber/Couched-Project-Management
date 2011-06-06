function(data) {
  // $.log(data)
  return {
    projects : data.rows.map(function(r) {
        return r.value;
    })
  };
};