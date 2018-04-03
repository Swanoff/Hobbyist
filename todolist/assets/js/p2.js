$("ul").on("click","li",function(event){
    event.stopPropagation();
    $(this).toggleClass("clicked");
});


$("ul").on("click","span",function(event){
    event.stopPropagation();
    $(this).parent().fadeOut(400,function(){
        this.remove();
    })
})

$("input[type='text']").keypress(function(event){
    if(event.which===13){
        var listitem=$(this).val();
        var pre='<li><span> <i class="fa fa-trash-o" aria-hidden="true"></i> </span>';
        if(listitem!==""){
            $("ul").append(pre+listitem+"</li>");
        }
        $(this).val("");
        
    }
});


$("#plus").on("click",function(){
  $("input[type='text']").fadeToggle(500,function(){
});
});