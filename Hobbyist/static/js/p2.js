var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
//here jquery selectors have been addressed to ancestors of the selectors to which they need to be applied.
//It has been done to make sure the script works on dynamically added html
//remove list item
$(".items").on("click","ul li",function(event){
    event.stopPropagation();
    $(this).toggleClass("clicked");
    $(this).parent().children(":nth-child(2)") = !($(this).parent().children(":nth-child(2)"))
});

//check=true for list item
$(".items").on("click","ul span",function(event){
    event.stopPropagation();
    $(this).parent().fadeOut(400,function(){
        this.remove();
    });
});
//add item to list
$(".items").on("keypress","input[type='text']",function(event){
    if(event.which===13){
        var listitem=$(this).val();
        console.log(listitem);
        listitem = escapeHtml(listitem);
        var pre='<li><span> <i class="fa fa-trash-o" aria-hidden="true"></i> </span>';
        if(listitem!==""){
            $(this).parent().children(':nth-child(4)').append(pre+listitem+"</li>");//identifying the correct list
        }
        $(this).val("");

    }
});

//edit list name
$(".items").on("click",".plus",function(){
  var h = $(this).parent().parent();
  console.log(h);
  var head = $(h)[0]
   var $d=$(head), isEditable=$d.is('.editable');
  $d.prop('contenteditable',!isEditable).toggleClass('editable');
});
//sending list data on saving using AJAX
$(".items").on("click",".save",function(){
  var id = $(this).parent().children(':nth-child(3)').text();
  var name = $(this).parent().children(':nth-child(1)').text();
  var list = $(this).parent().children(':nth-child(4)').children();

  var i=0;
  var arr = [];
  for(i=0;i<list.length;i++){
    arr.push($(list[i]).text());
    // j = 0;
    // while(arr[i].charAt(j)==" "){
    //
    // }
    //arr[i] = arr[i].split(' ').join("")
  }
  id = id.split(' ').join("")
  name = name.split(' ').join("")

   console.log(arr)
    console.log(id)
    console.log(name)

  $.post("/hobby_app/save/",{
    "name":name,
    "id":id,
    "list":arr,
  },function(){
    alert("Saved");
  });
});
//adding a new list object
$("body").on("click",".add",function(){
  var add='<div id="container"><h1 id="holy">New List<div><i class="plus fa fa-pencil-square-o bar" aria-hidden="true"></i></div></h1><input type="text" placeholder="Add To-dos " class="place"><p hidden="true">-1</p><ul></ul><button class = "save" name="save" type="button"> Save </button></div>'
  $(".items").append(add);
  console.log($(this).parent().parent());
});
