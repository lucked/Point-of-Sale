$('#editproduct').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget); // Button that triggered the modal
    var name = button.data('product-name'); // Extract info from data-* attributes
    var price = button.data('product-price'); // Extract info from data-* attributes
    var description = button.data('product-description'); // Extract info from data-* attributes
    var ordernumber = button.data('product-ordernumber'); // Extract info from data-* attributes
    var id = button.data('product-id'); // Extract info from data-* attributes
    console.log (id);
    var modal = $(this);
    modal.find('.modal-title').text('Produkt bearbeiten' + name);
    modal.find('#name').val(name);
    modal.find('#price').val(price);
    modal.find('#description').val(description);
    modal.find('#ordernumber').val(ordernumber);
    form_url = "/products/" + id + "?_method=PUT";
    modal.find(".modal-body form").attr("action", form_url);

    //modal.find(".modal-body form").action = "/products/" + id + "?_method=PUT";
});