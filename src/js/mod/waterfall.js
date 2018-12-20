var WaterFall=(function(){
    var $ct
    var $items
    function render($c){
        $ct=$c
        $items=$ct.children()
        var nodeWidth=$items.outerWidth(true),
            colNum=parseInt(($(window).width()-60)/nodeWidth),//计算有多少列 //左右margin 宽度是60
            colSumHeight=[]
            for(var i=0;i<colNum;i++){//设置每一列的初始高度为0
                colSumHeight.push(0)
            }
            $items.each(function(){
                var $cur=$(this)
                var idx=0,minSumHeight=colSumHeight[0]
                for(var i=0;i<colSumHeight.length;i++){//找到最矮的那一列
                    if(colSumHeight[i]<minSumHeight){
                        idx=i
                        minSumHeight=colSumHeight[i]
                    }
                }
                $cur.css({
                    //把新的便签放在高度最低的那列下面
                    left:nodeWidth*idx,
                    top:minSumHeight,
                })
                colSumHeight[idx]=$cur.outerHeight(true)+colSumHeight[idx]
            })
    }
    $(window).on('resize',function(){
        render($ct)
    })

    return {
        init:render
    }
})()

module.exports=WaterFall