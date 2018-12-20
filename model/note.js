var Sequelize = require('sequelize');
var path=require('path')
//创建数据库
const sequelize = new Sequelize(undefined,undefined,undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname,'../database/database.sqlite')
});
var Note= sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  //不需要ID，因为会自动给ID
});
//存在数据库那么就把他删除掉
//Note.sync({force:true})
module.exports.Note=Note

/*
  Note.sync().then(() => {
    // Table created
    return Note.create({
      text: 'hello'
    });
  });

*/
//具体的复杂情况看文档http://docs.sequelizejs.com/manual/installation/getting-started.html
//raw:true 获取原始数据，去除不必要的信息
/** 
Note.findAll({raw:true,where:{id:2}}).then(note => {
    console.log(note)
  })
*/ 