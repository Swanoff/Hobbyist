//Adding title
$("#title_input").keypress(function(event){
  if(event.which === 13){
    var titleText = $(this).val();
    $(this).val("");
    $("#title").attr('id', 'title_replaced');
    $("#title_replaced").html('<p style="line-height:69px; font-size:50px;">'+titleText+'</p>');
  }
})

//Check off specific todos by clicking
$("ul").on("click", "li", function(){
  $(this).toggleClass("completed");
});

//Deleting todo
$("ul").on("click", "span", function(event){
  $(this).parent().fadeOut(500,function(){
    $(this).remove();
  });
  event.stopPropagation();
});

//Adding todo
$("#add_list").keypress(function(event){
  if(event.which === 13){
    //Grabbing new text from input
    var todoText = $(this).val();
    //clearing the text entered in input box
    $(this).val("");
    //create a new li and add to ul
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li");
  }
});

//Making list elements sortable in y-axis
$( function() {
  $( "#sortable" ).sortable({axis:"y"});
  $( "#sortable" ).disableSelection();
} );

//alert("Connected!");
/*//Strike through specific todos when clicked
$("li").click(function(){
  //if li is unstriked, then strike.
  if ($(this).css("textDecoration") === "none")
  {
    $(this).css({
      color: "gray",
      textDecoration: "line-through"
    });
  }
  //else if it's already striked, then unstrike it.
  else {
    $(this).css({
      color: "black",
      textDecoration: "none"
    })
  }
});*/

/*
$("li").click(function(){
  if ($(this).css("color") === "rgb(128, 128, 128)")
  {
    $(this).css({
      color: "black",
      textDecoration: "none"
    });
  }
  else {
    $(this).css({
      color: "gray",
      textDecoration: "line-through"
    });
  }
});*/
