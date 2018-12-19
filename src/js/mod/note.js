require('less/note.less');
var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');
function Note(opts){  // opts{context:userInput,color:currentColor}
  console.log(opts)
  this.initOpts(opts);
  this.createNote();
  this.setStyle(opts['color']);
  this.bindEvent();
}
Note.prototype = {

  colors: [
    ['#AD1E1E','#D92626'], // headColor, containerColor
    ['#0E9290','#0CB7B4'],
    ['#CBB628','#FFE332'],
    ['#59A335','#6FCC42'],
    ['#CA720E','#FC8F11'],
    ['#3f78c3','#5591d2']
  ],
  defaultOpts: {
    id: '',   //Note的 id
    $ct: $('#content').length>0?$('#content'):$('body'),  //默认存放 Note 的容器
    context: 'input here' , //Note 的内容  ,
    date:'',  //创建时间2018-12-19 01:40:07.693 +00:00
  },

  initOpts: function (opts) {
    this.opts = $.extend({}, this.defaultOpts, opts||{});
    //console.log(this.opts)
    if(this.opts.id){
       this.id = this.opts.id;    
    }
  },

  createNote: function () {
    var tpl =`<div class="note">
              <div class="note-head"><span class="date">
              </span><span class="delete">  
              <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-delete"></use>
              </svg></span></div>
              <div class="note-ct" contenteditable="true">
              </div>
              </div>`;
    var date,temp;       
    if(this.opts.id){
      temp=new Date(this.opts.date.slice(0,10)) //'2018-12-19'
      date=temp.toString().slice(4,15)//"Wed Dec 19 2018 08:00:00 GMT+0800 (中国标准时间)"
    }     
    this.$note = $(tpl);
    this.$note.find('.note-ct').text(this.opts.context);
    this.$note.find('.date').text(this.opts.date);
    this.opts.$ct.append(this.$note);
    if(!this.id)this.$note.css({
      'left':'50%',
      'top':'20%',
      'position':'absolute',
      'transform':'translateX(-50%,-50%)',
    });  //新增放到右边
  },

  setStyle: function (color) {// color:['red','red']
    //var color = this.colors[Math.floor(Math.random()*6)];
    this.$note.find('.note-head').css('background-color', color);
    this.$note.find('.note-ct').css('background-color', color);
  },

  setLayout: function(){
    var self = this;
    if(self.clk){
      clearTimeout(self.clk);
    }
    self.clk = setTimeout(function(){
      Event.fire('waterfall');
    },100);
  },

  bindEvent: function () {
    var self = this,
        $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete');
    $delete.on('click', function(){
      self.delete();
    })

    Event.on('confirm',function(data){
      if(!self.id){
        console.log('newdata')
        console.log(data)
        self.setLayout()
        self.add(data)
      }
    })
//contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
    $noteCt.on('focus', function() {
      if($noteCt.html()=='input here') $noteCt.html('');
      $noteCt.data('before', $noteCt.html());
    }).on('blur paste', function() {     
      if( $noteCt.data('before') != $noteCt.html() ) {
        $noteCt.data('before',$noteCt.html());
        self.setLayout();
        if(self.id){
          self.edit($noteCt.html())
        }else{
          self.add($noteCt.html())
        }
      }
    });

    //设置笔记的移动
    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
          evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY}); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function(){
       $note.removeClass('draggable').removeData('pos');
    });

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        left: e.pageX-$('.draggable').data('evtPos').x
      });
    });
  },

  edit: function (msg) {
    var self = this;
    $.post('/api/notes/edit',{
        id: this.id,
        note: msg
      }).done(function(ret){
      if(ret.status === 0){
        Toast('修改成功');
      }else{
        Toast(ret.errorMsg);
      }
    })
  },

  add: function (data){
    var self = this;
    $.post('/api/notes/add', {note: data.context,color:data.color,date:data.date})
      .done(function(ret){
        if(ret.status === 0){
          Toast('添加成功');
        }else{
          self.$note.remove();
          Event.fire('waterfall')
          Toast(ret.errorMsg);
        }
      });
    //todo
  },

  delete: function(){
    var self = this;
    $.post('/api/notes/delete', {id: this.id})
      .done(function(ret){
        if(ret.status === 0){
          Toast('删除成功');
          self.$note.remove();
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg);
        }
    });

  }

};

module.exports.Note = Note;

