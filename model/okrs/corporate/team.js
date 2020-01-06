module.exports = (sequelize, type) => {
return sequelize.define('team', {
  ID_Team: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  KR_Team: type.STRING,
  StartDate: type.STRING,
  EndDate: type.STRING,
  ID_Teamcorporate: type.INTEGER,
})
}