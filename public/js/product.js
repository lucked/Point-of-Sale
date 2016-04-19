$('#editproduct').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var id = button.data('product-id');
    var modal = $(this);
    var url = "/api/products/?search=" + id;
    $.getJSON({
        type: 'get',
        url: url,
        success: function(data) {
            var data=data[0];
            modal.find('.modal-title').text('Produkt bearbeiten' + data.name);
            modal.find('#name').val(data.name);
            modal.find('#price').val(data.price);
            modal.find('#description').val(data.description);
            modal.find('#ordernumber').val(data.ordernumber);
            form_url = "/products/" + data._id + "?_method=PUT";
            modal.find(".modal-body form").attr("action", form_url);
        },
        error: function(xhr, textStatus, errorThrown) {
        }
    });


    //modal.find(".modal-body form").action = "/products/" + id + "?_method=PUT";
});
