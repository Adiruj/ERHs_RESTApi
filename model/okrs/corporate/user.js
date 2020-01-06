module.exports = (sequelize, type) => {
return sequelize.define('user', {
  ID_Name: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  ID_Company: type.INTEGER,
  Username: type.STRING,
  Password: type.STRING,
  Employee_Name: type.INTEGER,
  Name: type.STRING,
  Dept: type.STRING,
  Section: type.STRING,
  Email: type.STRING,
  Tel: type.INTEGER,
  Profile: type.STRING,
  Level: type.INTEGER,
})
}