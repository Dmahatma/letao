$(function(){
    $.ajax({
        type:'get',
        url: '/category/queryTopCategory',
        dataType:'json',
        success: function( info ) {
            var htmlStr = template('leftTpl',info);
            $('.lt_category_left ul').html(htmlStr);
            renderById( info.rows[0].id);
        }
    });
    $('.lt_category_left').on('click','a',function(){
        $('.lt_category_left a').removeClass('current');
        $(this).addClass('current');
        var id = $(this).data('id');
        renderById(id);
    })
})
function renderById(id) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        dataType:'json',
        success: function ( info ) {
            console.log( info )
            var htmlStr = template('rightTpl',info);
            $('.lt_category_right ul').html(htmlStr);
        }
    })
}