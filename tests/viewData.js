const bdd = require('../index');

// par audre croisant
bdd.viewData({
  bddName: "test",
  param: "asc",
  info: "16"
}, function(data) {
  console.log(data);
});
