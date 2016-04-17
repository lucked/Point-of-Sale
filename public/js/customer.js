/**
 * Created by Pierre on 28.02.16.
 */

$('#editCustomer').on('show.bs.modal', function(event) {

    var button = $(event.relatedTarget); // Button that triggered the modal
    var id = button.data('customer-id');

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


function queryapi(value) {
    if (value.length >= 3 || value.length === 0) {
        var url = "api/customers/?search=" + value;
        $.getJSON({
            type: 'get',
            url: url,
            success: function(data) {
                var newtable = "<tbody><tr><th class='col-lg-2'>Name</th><th class='col-lg-3'>Phone</th><th class='col-lg-5'>Address</th><th class='col-lg-2'>edit</th><th class='col-lg-2'>new</th></tr>";
                data.forEach(function(element) {
                    newtable = newtable + "<tr> <td> " + element.name + " </td><td>" + element.phone + "</td > <td>" + element.street + " " + element.housenumber + " " + element.city + "</td> <td> <button type='button' class='btn btn-primary' data-toggle='modal' data-target='#editCustomer' data-customer-id='" + element._id + "'>Edit</button> </td> <td><a href='customers/" + element._id + "/orders/new' class='btn btn-success'>New order</a></td></tr>";
                });
                $("#customertable").html(newtable + "</tbody > ");
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}

queryapi("");
