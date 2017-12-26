$("document").ready(function() {
    // This would start the modal option
    $('.modal').modal({});


    //THis function manage the collapse menu
    $(".button-collapse").sideNav();
    $('.slider').slider({
        indicators: false,
        height: 500
    });
    // This function would manage the option to add notes. Button and route also
    $('.orange').on('click', function(event) {
        // Woudl open the module and grap the Id from the button
        $('#modal1').modal('open');
        var id = $(this).data('id');
        // There is the user is agree with the note, would save it into the database
        $("#agree").on("click", function(event) {
            event.preventDefault();
            var note = {
                id: id,
                body: $("#note").val().trim()
            }
            $.ajax({
                    method: 'POST',
                    url: "/articles/" + id,
                    data: note
                })
                .done(function(data) {
                    location.reload();
                    // This is clearing the form
                    $("#article_id").val('');
                    $("#note").val('');
                });
        });
    });

    //This function would react to the look notes button

    $(".notes").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        //This is creaning the DIV containing the notes response 
        $('#modal-notes').empty();
        $.ajax({
                method: 'GET',
                url: "./articles/" + id
            })
            .done(function(data) {
                // Here is creating dynamically the modal response 
                $('#modal-notes').append('<h4>Notes:</h4>');
                $('#modal-notes').append('<p>' + data.body + '</p>');
                $('#modal2').modal('open');
            })
    })
});