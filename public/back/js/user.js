$(function () {
    // 1.一进入入页面，应该发送ajax请求，获取数据，动态渲染(模板引擎)
    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    render();
    

    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('userTpl', info);
                // 渲染tbody中的数据
                $('tbody').html(htmlStr);
                // 根据请求回来的数据，完成分页的初始化显示
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, b, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    // 2. 点击表格中的按钮, 显示模态框
    // 事件委托的作用:
    // 1. 给动态创建的元素绑定点击事件
    // 2. 批量绑定点击事件 (效率比较高的)
    // 思路: 使用事件委托绑定按钮点击事件
    $('tbody').on('click','.btn',function(){
        // 显示userModal 模态框
        $('#userModal').modal('show');
        currentId = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        // 给模态框的确定按钮添加点击事件
        $('#confirmBtn').click(function(){
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:currentId,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function(info){
                    // console.log(info);
                    if(info.success){
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            })
        })
    })
})