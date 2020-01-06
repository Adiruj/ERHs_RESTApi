module.exports = (sequelize, type) => {
return sequelize.define('personal_detail', {
  ID_Personaldetail: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  KR_Personal: type.STRING,
  Detail_Personal: type.STRING,
  Weight: type.DOUBLE,
  Status: type.STRING,
})
}