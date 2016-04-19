$('#editproduct').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    // var name = button.data('product-name'); // Extract info from data-* attributes
    // var price = button.data('product-price'); // Extract info from data-* attributes
    // var description = button.data('product-description'); // Extract info from data-* attributes
    // var ordernumber = button.data('product-ordernumber'); // Extract info from data-* attributes
    var id = button.data('product-id'); // Extract info from data-* attributes
    console.log(id);
    var modal = $(this);
    var url = "/api/products/?search=" + id;
    console.log (url)
    $.getJSON({
        type: 'get',
        url: url,
        success: function(data) {
            var data=data[0];
            console.log(data)
            modal.find('.modal-title').text('Produkt bearbeiten' + data.name);
            modal.find('#name').val(data.name);
            modal.find('#price').val(data.price);
            modal.find('#description').val(data.description);
            modal.find('#ordernumber').val(data.ordernumber);
            form_url = "/products/" + data._id + "?_method=PUT";
            modal.find(".modal-body form").attr("action", form_url);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


    //modal.find(".modal-body form").action = "/products/" + id + "?_method=PUT";
});
