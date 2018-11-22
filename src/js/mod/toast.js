require('less/toast.less')
var $=require('jquery')
//构造函数toast
function toast(msg,time){
	this.msg=msg
	this.dismissTime=time||1000
	this.createToast()
	this.showToast()
}
toast.prototype={
	createToast:function(){
		var tpl='<div class="toast">'+this.msg+'</div>'
		this.$toast=$(tpl)
		$('body').append(this.$toast)
	},
	showToast:function(){
		var self=this
		this.$toast.fadeIn(300,function(){
			setTimeout(function(){
				self.$toast.fadeOut(300,function(){
					self.$toast.remove()
				})
			},self.dimissTime)
		})

	}
}

function Toast(msg,time){
	return new toast(msg,time)
}
window.Toast=Toast
Toast('hello')

module.exports.Toast=Toast


