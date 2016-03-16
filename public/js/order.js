/**
 * Created by Pierre on 16.03.16.
 */
var table = document.getElementById("ordered");

function addOrderlist(id) {
    function findById(source, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i]._id === id) {
                return source[i];
            }
        }
        throw "Couldn't find object with id: " + id;
    };
    product = findById(products, id);

    var newRow = table.insertRow(table.rows.length);

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(0);
    var secondcell = newRow.insertCell(1);

    // Append a text node to the cell
    var newText = document.createTextNode(product.name)
    var secondtext = document.createTextNode(product.price + " €")
    newCell.appendChild(newText);
    secondcell.appendChild(secondtext);
};