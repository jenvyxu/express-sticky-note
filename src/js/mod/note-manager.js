var Toast=require('./toast.js').Toast
var Note=require('./note.js').Note
var Event=require('mod/event.js')
var NoteManager=(function(){
    function load(){
        $.get('/api/notes')
        .done(function(ret){
            console.log('ret')
            console.log(ret)
            if(ret.status==0){
                $.each(ret.data,function(idx,note){
                    new Note({
                        id: note.id,
                        context:note.text,
                        username:note.username,
                        color:note.color,
                        date:note.date,
                    })
                })
                Event.fire('waterfall')
            }else{
                Toast(ret.errorMsg)
            }
        })
        .fail(function(){
            Toast('网络异常')
        })
    }
    function add(data){
        new Note(data)
    }
    return {
        load:load,
        add:add
    }
})()

module.exports.NoteManager=NoteManager