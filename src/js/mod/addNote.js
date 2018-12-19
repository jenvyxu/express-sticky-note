var NoteManager=require('mod/note-manager.js').NoteManager
var Event=require('mod/event.js')
var WaterFall=require('mod/waterfall.js')
var Note=require('mod/note.js').Note
var currentColor='#AD1E1E'
var addNote=function (){
    var data=$('.mask-content').text()
    //if(data==='input here') $('.mask-content').html('');
    $('.add-note').on('click',function(){
        $('.mask').css({'display':'flex'})     
    })
    $('.exit').on('click',function(){
        $('.mask').css({'display':'none'})
    })
    $('.confirm').on('click',function(){
        var userInput=$('.mask-content').text()
        $('.mask').css({'display':'none'})
        $('.mask-content').html('');
        NoteManager.add({  // 在页面添加一个note
            context:userInput,
            color:currentColor})
        Event.fire('confirm',{  //把新建note的数据上传到服务器
            context:userInput,
            color:currentColor})
        Event.fire('waterfall')
    })
    $('.color').each(function(){
        let curLi=this
        $(curLi).on('click',function(){  
            currentColor=$(this).css('background-color')  
        })
    })  
}

module.exports.addNote=addNote