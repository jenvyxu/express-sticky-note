require('less/addNote.less')
var NoteManager=require('mod/note-manager.js').NoteManager
var Event=require('mod/event.js')
var currentColor='#FF666A'
var date=''
var addNote=function (){
    var temp=new Date()
    date=temp.toString().slice(4,15)
    $('.add-note').on('click',function(){
        $('.mask').css({'display':'flex'})     
    })
    $('.exit').on('click',function(){
        $('.mask').css({'display':'none'})
    })
    $('.mask-content').on('keydown',function(e){ //防止div输入换行出现bug
        if (e.keyCode === 13) {
           document.execCommand('insertHTML', false, '<br><br>');
          return false;
        }
    })
    $('.confirm').on('click',function(){
        var userInput=$('.mask-content').html()
        $('.mask').css({'display':'none'})
        $('.mask-content').html('');
        NoteManager.add({  // 在页面添加一个note
            context:userInput,
            color:currentColor,
            date:date,
        })
        Event.fire('confirm',{  //把新建note的数据上传到服务器
            context:userInput,
            color:currentColor,
            date:date
        })         
        Event.fire('waterfall')
    })
    $('.color').each(function(){
        let curLi=this
        let $title=$('.mask-header')
        $(curLi).on('click',function(){ 
            $(this).addClass('selected').siblings().removeClass('selected')//.remove()
            currentColor=$(this).css('background-color')
            $title.css({color:currentColor})
              
        })
    })  
}

module.exports.addNote=addNote