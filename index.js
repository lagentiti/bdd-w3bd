const fs = require('fs');

const bdds = fs.readdirSync(__dirname + "/bdd/").filter(bdd => bdd.endsWith(".w3bd"));

/**
 * 
 * @param {String} bddName the name of the bdd
 * @param {String} message
 * @param {String} by
 */
exports.addData = ({ bddName, message, by }) => {
  if (bddName !== undefined) {
    if (message !== undefined) {
      if (message.indexOf("◊") == -1) {
        if (message.indexOf("♠") == -1) {
          if (by !== undefined) {
            let add = ({ id }) => {
              let dataAdd = `\n${id}♠${message}♠${Date.now()}♠${by}◊`;
              fs.appendFileSync(`${__dirname}/bdd/${bddName}.w3bd`, dataAdd);
            };
            var bddVerif = 0;
            for (let i = 1; i <= bdds.length; i++) {
              const name = bdds[i - 1].split(".")[0];
              if (name == bddName) {
                var bddVerif = 1;
              };
              if (i == bdds.length) {
                if (bddVerif == 1) {
                  fs.readFile(`${__dirname}/bdd/${bddName}.w3bd`, (err, data) => {
                    if (err) throw err;
                    var id = 0;
                    let bdd = data.toString();
                    if (bdd.length == 0) {
                      add({ id: 1 });
                    } else {
                      for (a = 1; a <= bdd.length; a++) {
                        if (bdd[a - 1] == "◊") {
                          var id = id + 1;
                        };
                        if (a == bdd.length) {
                          add({ id: id + 1 });
                          return;
                        };
                      };
                    }
                  });
                } else {
                  throw new Error('bdd not find');
                };
              };
            };
          } else {
            throw new Error("there is no defined user");
          };
        } else {
          throw new Error("you cannot use the ◊ and ♠");
        };
      } else {
        throw new Error("you cannot use the ◊ and ♠");
      };
    } else {
      throw new Error("there is no message");
    };
  } else {
    throw new Error("The name of the bdd is not defined");
  };
};

/**
 * 
 * @param {String} bddName the name of the bdd
 * @param {Array} id
 */
exports.removeData = ({ bddName, id }) => {
  if (bddName !== undefined) {
    if (id !== undefined) {
      var bddVerif = 0;
      for (let i = 1; i <= bdds.length; i++) {
        const name = bdds[i - 1].split(".")[0];
        if (name == bddName) {
          var bddVerif = 1;
        };
        if (i == bdds.length) {
          if (bddVerif == 1) {
            fs.readFile(`${__dirname}/bdd/${bddName}.w3bd`, (err, caractere) => {
              if (err) throw err;
              let bdd = caractere.toString();
              for (a = 0; a <= bdd.length; a++) {
                if (bdd[a - 1] == "\n") {
                  if (bdd[a] == id) {
                    const removeLines = (data, lines = []) => {
                      return data
                        .split('\n')
                        .filter((val, idx) => lines.indexOf(idx) === -1)
                        .join('\n');
                    };
                    fs.readFile(`${__dirname}/bdd/${bddName}.w3bd`, 'utf8', (err, data) => {
                      if (err) throw err;
                      fs.writeFile(`${__dirname}/bdd/${bddName}.w3bd`, removeLines(data, [id]), 'utf8', function (err) {
                        if (err) throw err;
                      });
                    });
                  };
                };
              };
            });
          } else {
            throw new Error('bdd not find');
          };
        };
      };
    } else {
      throw new Error("there is no message");
    };
  } else {
    throw new Error("The name of the bdd is not defined");
  };
};

/**
 * 
 * @param {String} bddName the name of the bdd
 * @param {String} param
 * @param {String} info
 */
exports.viewData = ({ bddName, param, info }, callback) => {
  if (bddName !== undefined) {
    if (param !== undefined) {
      if (info !== undefined) {
        if (param.toLowerCase() == "asc") {
          fs.readFile(`${__dirname}/bdd/${bddName}.w3bd`, (err, caractere) => {
            var data = 0;
            let bdd = caractere.toString();
            for (i = 0; i <= caractere.length; i++) {
              if (bdd[i] == "◊") {
                var data = data + 1;
              };
              if (data == info) {
                var data = "";
                for (a = 0; a <= i; a++) {
                  var data = data + bdd[a];
                };
                return callback(data);
              };
              if (i == caractere.length) {
                var data = "";
                for (a = 0; a <= bdd.length - 1; a++) {
                  var data = data + bdd[a];
                }
                return callback(data)
              };
            };
          });
        };
      } else {
        throw new Error("l'info n'est pas defini");
      };
    } else {
      throw new Error("le paramètre n'est pas defini");
    };
  } else {
    throw new Error("The name of the bdd is not defined");
  };
};

/**
 * 
 * @param {String} bddName the name of the bdd
 */
exports.addBdd = ({ bddName }) => {
  if (bddName !== undefined) {
    let create = () => {
      fs.writeFile(`${__dirname}/bdd/${bddName}.w3bd`, '', function (err) {
        if (err) throw err;
        return;
      });
    };
    if (bdds[0] !== undefined) {
      for (i = 1; i <= bdds.length; i++) {
        const name = bdds[i - 1].split(".")[0];
        if (bddName !== name) {
          create();
          break;
        } else {
          throw new Error("The name of the bdd is already use");
        };
      };
    } else {
      return create();
    };
  } else {
    throw new Error("The name of the bdd is not defined");
  };
};

/**
 * 
 * @param {String} bddName le nom de la bdd 
 */
exports.removeBdd = ({ bddName }) => {
  if (bddName !== undefined) {
    let remove = () => {
      fs.unlink(`${__dirname}/bdd/${bddName}.w3bd`, function (err) {
        if (err) throw err;
      });
    };
    for (i = 1; i <= bdds.length; i++) {
      if (bdds.length == 1) {
        if (bdds[0].split(".")[0] == bddName) {
          remove()
          break;
        };
      };
      if (i !== bdds.length) {
        if (bdds[i].split(".")[0] !== bddName) {
          if (bddName == bdds[i - 1].split(".")[0]) {
            remove();
            break;
          };
        } else {
          remove();
          break;
        };
      } else {
        throw new Error("The name of the bdd does not exist");
      };
    };
  } else {
    throw new Error("The name of the bdd is not defined");
  };
};
