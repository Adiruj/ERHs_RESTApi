const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const corporatemodel = require('../model/okrs/corporate/corporate')
const corporate_detailmodel = require('../model/okrs/corporate/corporate_detail')
const corporate_teammodel = require('../model/okrs/corporate/corporate_team')
const teammodel = require('../model/okrs/corporate/team')
const personalmodel = require('../model/okrs/corporate/personal')
const personal_detailmodel = require('../model/okrs/corporate/personal_detail')
const usermodel = require('../model/okrs/corporate/user')

//const db = {};
//db.Sequelize = Sequelize;
//db.sequelize = sequelize;

//import model
//db.corporate = require('../model/okrs/corporate/corporate')(sequelize, Sequelize);
//db.corporate_detail = require('../model/okrs/corporate/corporate_detail')(sequelize, Sequelize);

const corporate = corporatemodel(sequelize, Sequelize)
const corporate_detail = corporate_detailmodel(sequelize, Sequelize)
const corporate_team = corporate_teammodel(sequelize, Sequelize)
const team = teammodel(sequelize, Sequelize)
const personal = personalmodel(sequelize, Sequelize)
const personal_detail = personal_detailmodel(sequelize, Sequelize)
const user = usermodel(sequelize, Sequelize)


corporate.hasMany(corporate_detail, {foreignKey: 'corporateIDCorporate'});
corporate_detail.belongsTo(corporate, {foreignKey: 'corporateIDCorporate'});

corporate_detail.hasMany(corporate_team, {foreignKey: 'ID_Corporatedetail'});
corporate_team.belongsTo(corporate_detail, {foreignKey: 'ID_Corporatedetail'});

personal.hasMany(team, {foreignKey: 'ID_Team'});
personal.hasMany(personal_detail, {foreignKey: 'ID_Personal'});
team.belongsTo(personal, {foreignKey: 'ID_Team'});
personal_detail.belongsTo(personal, {foreignKey: 'ID_Personal'});


//corporate.hasMany(corporate_detail)

//sequelize.sync({ force: false })
//.then(() => {
//console.log(`Database & tables created here!`)
//})

module.exports = {
  corporate,
  corporate_detail,
  corporate_team,
  user,
  personal,
  team,
  personal_detail,
  }

//module.exports = db;