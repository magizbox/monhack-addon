self.port.on("opened", function(){
    $('#search').focus();
    $("#search").val("");
})
$('#search').keyup(function(e){
    if(e.keyCode == 13) {
        var value = $('#search').val();
        var monhackURL = "http://monhack.com/" + value;
        self.port.emit("entered_keyword", monhackURL);
    }
});

