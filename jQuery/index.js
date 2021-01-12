// $("h1").css("color","red");

$("h1").addClass("big-title margin-50");

$("h1").removeClass("margin-50");

$("button").html("<em>Click me<em>"); // change with using HTML.
$("button").text("hi"); // change the text only.
 console.log($("a").attr("href"));  //get the value from HTML attribute.
$("a").attr("href","https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_attr_set_func");// set the value for HTML attribute.

// How to add ecvent listeners using jQuery.
$("button").click(function(){
  $("h1").css("color","red");
});

$("body").keypress(function(event){
  $("h1").text(event.key);
});

// another way to detect event using jQuery.

$("h1").on("mouseover",function(){
  $("h1").css("color","blue");
});
