var ModelUser = require('../model/user')

module.exports = function(app){
    console.log('进入到我们的路由配置文件');
    //返回主页面
    app.get('/',function (req ,res,next){
        res.render('index',{title: '首页'})
    });

    app.get('/index',function (req ,res,next){
        res.render('index',{title: '首页'})
    });

    //返回登录页
    app.get('/login',function(req,res,next){
        res.render('login',{title: '登录'});
    });

    //返回注册页
    app.get('/regist',function(req,res,next){
        res.render('regist',{title: '注册'});
    })

    //注册接口
    app.post('/regist',function(req,res,next){
        var postData = {
            username : req.body.username,
            password : req.body.password
        };
        ModelUser.create(postData,function(err,data){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login')
            }
        })
    })

    //登录接口
    app.post('/login',function(req,res,next){
        var data  = {//获取用户输入信息
            username : req.body.username,
            password : req.body.password
        }
        ModelUser.findOne(data,function(err,data){
            if(err){
                console.log(err)
            }
            if(data){//登录成功
                req.session.username = data.username;
                res.redirect('/')
                // res.setHeader('Content-Type', 'text/html; charset=utf-8');
                // res.write("<script>alert('登录成功');location='/';</script>")//提示登陆成功，之后跳转到主页面
            }else{
                res.redirect('/login')
            }
        })
    })

    
}