/**
 * Created by Pierre on 28.02.16.
 */
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    postal_code: 'short_name'
};
//use this function to populate the selected address in respective field
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
$('#newcustomer').on('show.bs.modal', function(event) {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var inputField;
    document.getElementById('newCustAdd').addEventListener('click', function() {
        inputField = document.getElementById('newCustAdd');
        autocomplete = new google.maps.places.Autocomplete(inputField);
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
    });
    var button = $(event.relatedTarget); // Button that triggered the modal
    var id = button.data('customer-id');
    if (id) {
        var modal = $(this);
        var url = "/api/customers/?search=" + id;
        $.getJSON({
            type: 'get',
            url: url,
            success: function(data) {
                var customer = data[0]
                modal.find('.modal-title').text('Editing Customer: ' + customer.name);
                modal.find('#name').val(customer.name);
                modal.find('#phone').val(customer.phone);
                modal.find('#route').val(customer.street);
                modal.find('#street_number').val(customer.housenumber);
                modal.find('#locality').val(customer.city);
                modal.find('#mail').val(customer.mail);
                modal.find('#story').val(customer.story);
                modal.find('#postal_code').val(customer.zipcode);
                form_url = "/customers/" + customer._id + "?_method=PUT";
                modal.find(".modal-body form").attr("action", form_url);
            },
            error: function(xhr, textStatus, errorThrown) {}
        });
    } else {}
});
$("#newcustomer").on("hidden.bs.modal", function() {
    $(".form-control").val("")
    var modal = $(this);
    form_url = "/customers";
    modal.find(".modal-body form").attr("action", form_url);
    modal.find('.modal-title').text('New customer');
});
$('#newcustomer').on('show.bs.modal', function() {});
