module.exports = (sequelize, type) => {
return sequelize.define('personal', {
  ID_Personal: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  KR_Personal: type.STRING,
  StartDate: type.STRING,
  EndDate: type.STRING,
  ID_Team: type.INTEGER,
})
}