var Hapi = require('hapi');
/////////////////////////////////////////////////////////////////////////////////////
// 数据库
/////////////////////////////////////////////////////////////////////////////////////

var mongoose = require('mongoose');    //引用mongoose模块
var db = mongoose.createConnection('localhost','test'); //创建一个数据库连接

//Schema
var PersonSchema = new mongoose.Schema({
  name:String  //定义一个属性name，类型为String
});

var PersonModel = db.model('Person',PersonSchema);


db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  //一次打开记录
  console.log('---------------------------');
  console.log('DB ready');
  console.log('---------------------------');

});
//======================================================================
// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route([
    {
        method: 'GET',
        path:'/get', 
        handler: function (request, reply) {
           //reply('hello world');
           
            PersonModel.find(function(err,persons){
              //查询到的所有person
              console.log(persons);

              reply(persons);
            });
          
        }
    },
    {
        method: 'GET',
        path:'/post', 
        handler: function (request, reply) {
           //reply('hello world');
           
            PersonModel.find(function(err,persons){
              console.log('there has '  + persons.length + ' people');

                var personEntity = new PersonModel({name:'person_'+persons.length});
                personEntity.save(function(){
                    //返回前台信息
                    reply(persons);
                });
              
            });
          
        }
    },
    {
        method: 'GET',
        path:'/delete', 
        handler: function (request, reply) {
           //reply('hello world');
           
            PersonModel.find(function(err,persons){
              console.log('there has '  + persons.length + ' people');

                // for(var i in persons){
                //     var _id = persons[i]._id;
                //     delete _id;
                //     //PersonModel.update({_id:_id},persons[i],function(err){});
                // }
                PersonModel.remove({},function(){
                    console.log('success delete');
                    reply([]);
                });
                 
              
            });
           
        }
    },
    {
        method: 'GET',
        path:'/put', 
        handler: function (request, reply) {
           //reply('hello world');
           
            PersonModel.find(function(err,persons){
              console.log('there has '  + persons.length + ' people');

                // for(var i in persons){
                //     var _id = persons[i]._id;
                //     delete _id;
                //     //PersonModel.update({_id:_id},persons[i],function(err){});
                // }
                PersonModel.remove({},function(){
                    console.log('success delete');
                    reply([]);
                });
                 
              
            });
           
        }
    }
]);

// Start the server
server.start(function(){
    console.log('server has runing...');
});




