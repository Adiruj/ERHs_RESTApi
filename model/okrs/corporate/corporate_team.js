module.exports = (sequelize, type) => {
return sequelize.define('corporate_team', {
  ID_Teamcorporate: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  Team: type.STRING,
  StartDate: type.STRING,
  EndDate: type.STRING,
})
}