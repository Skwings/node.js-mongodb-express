var ms = 5;// 定义全局变量,几秒之后自动跳转

// 跳转函数

function returnLogin(){
            if(ms>0){
                document.getElementById("btn_area").innerHTML="<span id='loginTip' class='ok_txt2'>恭喜注册成功！ "+ms+" 秒后将自动跳转至登录界面...</span><a href='login.html'>直接跳转</a>";
            }else{
                window.location.href="login.html";
            }
            ms--;// 每调用一次减减

}