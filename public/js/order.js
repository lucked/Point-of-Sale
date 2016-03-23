/**
 * Created by Pierre on 16.03.16.
 */
counter = 0;
function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i]._id === id) {
            return source[i];
        }
    }
    throw "Couldn't find object with id: " + id;
}

function addOrderlist(id) {

    product = findById(products, id);
    var table = document.getElementById("ordertable");

    var newRow = table.insertRow(table.rows.length);

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(0);
    var secondcell = newRow.insertCell(1);

    // Append a text node to the cell
    var newText = document.createTextNode(product.name);
    var secondtext = document.createTextNode(product.price + " €");
    newCell.appendChild(newText);
    secondcell.appendChild(secondtext);
    updatePrice(product.price);
    updateordered(product._id);
}

function updateordered (id) {


    var input = document.createElement("input");

    input.setAttribute("type", "hidden");

    input.setAttribute("name", "orderlist[" + counter + "]");

    input.setAttribute("value", id);

    document.getElementById("orderform").appendChild(input);
counter ++
}
function updatePrice (price) {
    sum = document.getElementById("sum");

    oldtotal = parseInt(sum.innerHTML);
    newtotal = oldtotal + price;

    sum.innerHTML = newtotal;

}