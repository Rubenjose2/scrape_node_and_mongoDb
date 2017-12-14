$("document").ready(function() {
    $('.modal').modal({
        ready: function(modal, trigger) {
            var id = $(trigger).data('id');
            $('#article_id').val(id);
        },
    });

    $(".button-collapse").sideNav();
    $('.slider').slider({
        indicators: false,
        height: 500
    });


    $("#agree").on("click", function(event) {
        event.preventDefault();
        var id = $('#article_id').val();
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
                $("#article_id").val('');
                $("#note").val('');
            })



    })







});