/**
 * Created by Pierre on 28.02.16.
 */

$('#editCustomer').on('show.bs.modal', function(event) {

    var button = $(event.relatedTarget); // Button that triggered the modal
    var name = button.data('customer-name');
    var phone = button.data('customer-phone');
    var street = button.data('customer-street');
    var housenumber = button.data('customer-housenumber');
    var city = button.data('customer-city');
    var mail = button.data('customer-mail');
    var story = button.data('customer-story');
    var id = button.data('customer-id');
    var zip = button.data('customer-zip');
    var modal = $(this);
    modal.find('.modal-title').text('Kunden bearbeiten' + name);
    modal.find('#name').val(name);
    modal.find('#phone').val(phone);
    modal.find('#street').val(street);
    modal.find('#housenumber').val(housenumber);
    modal.find('#city').val(city);
    modal.find('#mail').val(mail);
    modal.find('#story').val(story);
    modal.find('#zipcode').val(zip);

    form_url = "/customers/" + id + "?_method=PUT";
    modal.find(".modal-body form").attr("action", form_url);

    //modal.find(".modal-body form").action = "/products/" + id + "?_method=PUT";
});