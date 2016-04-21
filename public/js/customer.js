/**
 * Created by Pierre on 28.02.16.
 */

$('#editCustomer').on('show.bs.modal', function(event) {

    var button = $(event.relatedTarget); // Button that triggered the modal
    var id = button.data('customer-id');
    var modal = $(this);
    var url = "/api/customers/?search=" + id;
    $.getJSON({
        type: 'get',
        url: url,
        success: function(data) {
            var customer = data[0]
            modal.find('.modal-title').text('Kunden bearbeiten' + customer.name);
            modal.find('#name').val(customer.name);
            modal.find('#phone').val(customer.phone);
            modal.find('#street').val(customer.street);
            modal.find('#housenumber').val(customer.housenumber);
            modal.find('#city').val(customer.city);
            modal.find('#mail').val(customer.mail);
            modal.find('#story').val(customer.story);
            modal.find('#zipcode').val(customer.zipcode);
            form_url = "/customers/" + customer._id + "?_method=PUT";
            modal.find(".modal-body form").attr("action", form_url);
        },
        error: function(xhr, textStatus, errorThrown) {}
    });
});
