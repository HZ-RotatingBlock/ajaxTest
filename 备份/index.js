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
                    domRefresh : '<div class="droploadUp-refresh">↓下拉刷新消息</div>',
                    domUpdate  : '<div class="dropload-update">↑释放更新信息</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>消息加载中...</div>'
                },
                domDown : {
                    domClass   : 'dropload-down',
                    domRefresh : '<div class="droploadDown-refresh">↑上拉加载消息</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData  : '<div class="dropload-noData">暂无新信息</div>'
                },
                loadUpFn : function(me){
                    $.ajax({
                        type: 'GET',
                        url: './json/update1.json',
                        dataType: 'json',
                        success: function(data){
                            var result = '';
                            for(var i = 0; i < data.lists.length; i++){
                                result +=   '<li class="chat opacity">'
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
                loadDownFn : function(me){
                        page++;
                    // 拼接HTML
                    var result = '';
                    $.ajax({
                        type: 'GET',
                        url: './json/update2.json',
                        dataType: 'json',
                        success: function(data){
                            var arrLen = data.length;
                            if(arrLen > 0){
                                for(var i=0; i<arrLen; i++){
                                    result +=   '<li class="chat opacity">'
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
                            // 如果没有数据
                            }else{
                                // 锁定
                                me.lock();
                                // 无数据
                                me.noData();
                            }
                            // 为了测试，延迟1秒加载
                            setTimeout(function(){
                                // 插入数据到页面，放到最后面
                                $('#chatPage').append(result);
                                // 每次数据插入，必须重置
                                me.resetload();
                            },1000);
                        },
                        error: function(xhr, type){
                            alert('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });
                },
                threshold : 50
            });
        });
