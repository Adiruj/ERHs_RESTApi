module.exports = (sequelize, type) => {
  return sequelize.define('corporate', {
    ID_Corporate: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      ID_Company: type.INTEGER,
      Dept: type.STRING,
      Section: type.STRING,
      Topic: type.STRING,
  })
}