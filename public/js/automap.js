var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  //administrative_area_level_1: 'short_name',
  //country: 'long_name',
  postal_code: 'short_name'
};

$('#newcustomer').on('show.bs.modal', function() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  console.log('in newcustomer');
  var inputField;
  document.getElementById('newCustAdd').addEventListener('click', function() {

     inputField = document.getElementById('newCustAdd');
     autocomplete = new google.maps.places.Autocomplete(inputField);

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  });

});

$('#editCustomer').on('show.bs.modal', function() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  console.log('in editCustomer');
  var inputField;
  document.getElementById('editCustAdd').addEventListener('click', function() {

     inputField = document.getElementById('editCustAdd');
     autocomplete = new google.maps.places.Autocomplete(inputField);

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  });

});

//use this function to populate the selected address in respective field
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    console.log(component);
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
