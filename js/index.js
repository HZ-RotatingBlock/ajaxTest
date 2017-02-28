$(function(){
    // 页数
    var page = 0;
    // 每页展示10个
    var size = 10;

    // dropload
    $('#chatPage').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新消息</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新信息</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>消息加载中...</div>'
        },
        loadUpFn : function(me){
            $.ajax({
                type: 'GET',
                url: '../json/update.json',
                dataType: 'json',
                success: function(data){
                    var result = '';
                    for(var i = 0; i < data.lists.length; i++){
                        result +=   '<li class="chat">'
                                        +'<span class="userHeader">'
                                        	+'<img src="'+data.lists[i].pic+'" alt="用户头像">'
                                        +'</span>'
                                        +'<div class="chat_content">'
                                        	+'<div class="chat_content_name">'
                                        		+'<span class="user_name">'+data.lists[i].user+'</span>'
                                        		+'<span class="user_content">'+data.lists[i].return+'</span>'
                                        	+'</div>'
                                        	+'<div class="chat_content_time">'+data.lists[i].date+'</div>'
                                        +'</div>'
                                    +'</li>';
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        $('#chatPage').html(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                        // 重置页数，重新获取loadDownFn的数据
                        page = 0;
                        // 解锁loadDownFn里锁定的情况
                        me.unlock();
                        me.noData(false);
                    },1000);
                },
                error: function(xhr, type){
                    alert('ajax error!');
                    // 即使加载出错，也重置
                    me.resetload();
                }
            });
        },
        threshold : 50
    });
});