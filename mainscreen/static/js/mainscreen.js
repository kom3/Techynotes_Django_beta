window.mydom=null
$( document ).ready(function() {
    mydom = $(".main-dom")
    $('li').click(function(){
        $('li').css('color','#212529');
        $(this).css('color','red');
    });
});
mainscreen = {
 load_note: function (){
       $.ajax({
         type: 'GET',
         url:'loadnote',
         async:false,
         data:{"filename":"docker.html"}

       }).done(function(data){
        //    data="<p class='note-header'>loading data from file</p>"
          $(".rightpane-display-area").text("").append("<p></P>")
          $(".rightpane-display-area").text("").append(data)  //.replace(/\n/g, "<br />")

       });
    
 },
step_count : 0,
 add_step: function (){
    mainscreen.step_count = mainscreen.step_count + 1
    $(".notearea").append('<div class="step-header"><div class="stepname step'+mainscreen.step_count+'" contenteditable onkeyup="mainscreen.grabstep()">Step: '+mainscreen.step_count+'</div></div><div class="description"><div class="description_ip desc'+mainscreen.step_count+'" data-text="Description here..." contenteditable></div></div>')
    // $.ajax({
    //   type: 'GET',
    //   url:'loadnote',
    //   async:false,
    //   data:{"filename":"docker.html"}

    // }).done(function(data){
    //  //    data="<p class='note-header'>loading data from file</p>"
    //    $(".rightpanel").text("").append("<p></P>")
    //    $(".rightpanel").text("").append(data.replace(/\n/g, "<br />"))
    //    console.log(typeof(data))

    // });
 
},
// grabstep: function(){
//  console.log($(".stepname").html())
// },

  timeout:null,

 searchuserfromremote: function () {
    // var mydom = $("#mydom")
    // mydom.find(".remote_repos_list").html("<p></p>");
    // mydom.find(".repo_loader").show()
    username = mydom.find(".search").val()
    if (username.trim() != "") {
        if (mainscreen.timeout != null)
            clearTimeout(mainscreen.timeout)
        mainscreen.timeout = setTimeout(() => {
            // mydom.find(".remote_repos_list").html("<p></p>");
            if (username.trim() != "") {
                mydom.find(".displayuser").text("").append("<p style='color:green; font-size:18px'>searching...</p>");
            }
            $.ajax({
                type: 'GET',
                url: 'search_user',
                data: { "username": username }
            }).done(function (data) {
                if (data == "success") {
                    if (username.trim() != "") {
                        mydom.find(".displayuser").text("");
                        mydom.find(".displayuser").text("").append("<a class='btn btn-info btn-sm fetch-btn' onclick='mainscreen.fetch_user_notes()'>Get notes</a>").css({ "color": "green", "font-style": "bold", "font-size": "18px", "margin-left": "10px" });
                    }
                } else {
                    mydom.find(".repo_loader").hide()
                    mydom.find(".displayuser").text("no user found !").css({ "color": "red", "font-size": "18px", "margin-left": "10px" });
                }
            })

        }, 1000);
    } else {
        mydom.find(".repo_loader").hide()
        mydom.find(".displayuser").text("");
        mydom.find(".fetch-btn").hide();
        mydom.find(".remote_repos_list").html("<p></p>");

    }

 },

 save: function(){
     console.log("saving file...")
    total_steps = $(".stepname").length
    chapter_name = $(".chaptername").val()
    filename = $(".file_name").val()
    note_body = ""
    final_body = ""
    note_header = '<div class="note-header">'+chapter_name+'</div>'
    for(i=1; i<=total_steps; i++){
        step = ".step"+i
        desc = ".desc"+i
        step_name = $(step).html()
        desc = $(desc).html()
        note_body = note_body + '<div class="step-header">'+step_name+'</div><div class="description">'+desc+'</div>'
    }
     final_body = note_header + note_body
     $.ajax({
         type:"GET",
         url:"save_file",
         async:false,
         data:{"filename":filename,"finalbody":final_body}
     }).done(function(data){
         if(data == "success"){
             console.log("file saved suucessfully")
         }
         else{
             console.log("something went wrong!")
         }
     })
 },

 enablesavebtn : function(){
     if (mainscreen.step_count >= 1 && ($(".file_name").val()).trim() != ""){
        $("#save-btn").prop("disabled",false)
     }
     else{
        $("#save-btn").prop("disabled",true)

     }
 }

}