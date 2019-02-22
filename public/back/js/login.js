$(function () {
  //进行表单校验初始化
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //字段列表 field,要现在input中配置name属性
    fields: {
      //用户名
      username: {
        //校验规则
        validators: {
          // 非空
          notempty: {
            // 提示信息
            message: '用户名不能为空'
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度为2-6位'
          },
          // callback 专门用于配置回调提示信息
          callback:{
            message:"用户名不存在"
          }
        }
      },
      // 密码
      password: {
        // 配置校验规则
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });

// 使用submit 按钮，会进行表单提交，此时表单校验插件会立刻进行校验
//(1)校验成功，此时会默认提交，发生页面跳转，注册表单校验成功事件，在事件中阻止默认的跳转提交，通过ajax提交
// (2)校验失败，自动拦截提交
$('#form').on('success.form.bv',function(e){
  // 阻止默认的提交
  e.preventDefault();
  $.ajax({
    type:'post',
    // 本质上会自动拼接上前面的域名端口号    http://localhost:3000/employee/employeeLogin
    url:'/employee/employeeLogin', 
    // 表单序列化，自动将所有的配置了name属性的input值进行拼接，用于提交
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){

      // 调用插件实例方法，更新username字段状态
      if(info.error === 1000){
        $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
      }
      if(info.error === 1001){
        $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
      }
      if(info.success) {
        //登录成功，跳转首页
        location.href = 'index.html';
      }
    }
  })
})

// 表单重置功能
// reset 按钮，本身就可以重置内容，所以此时只需要重置状态即可
// (1)resetForm(false); 只重置状态
// (2)resetForm(true);  重置内容和状态
$('[type = "reset"]').click(function(){
  //重置状态即可
  $('#form').data('bootstrapValidator').resetForm();
})
});