module.exports = (sequelize, type) => {
return sequelize.define('corporate_detail', {
  ID_Corporatedetail: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  KR: type.STRING,
  StartDate: type.STRING,
  EndDate: type.STRING,
})
}