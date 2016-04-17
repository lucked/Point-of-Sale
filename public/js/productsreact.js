// components
// SearchableProductTable
// SearchBar
// ProductTable
// ProductRow

var ProductRow = React.createClass({
  render: function () {
    var buttons = this.props.product.deleted ?
      <td>
         <form id="undelete-form" action={"/products/"+  this.props.product._id +"?_method=PUT"} method="POST">
           <input type="hidden" value="false" name="product[deleted]"/>
           <button className="btn">undelete</button>
        </form>
      </td>
      :
      <div>
        <td>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editproduct" data-product-id={this.props.product._id}>Edit</button>
        </td>
        <td>
          <form id="delete-form" action={"/products/"+  this.props.product._id + "?_method=DELETE" }method="POST">
            <button className="btn btn-danger">Delete</button>
          </form>
        </td>
      </div>

    var trClass = this.props.product.deleted ? "disabled":"";
    return (
      <tr className={trClass}>
        <td>{this.props.product.ordernumber}</td>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.description}</td>
        <td>{this.props.product.price} €</td>
        {buttons}
      </tr>
    );
  }
});

var SearchBar = React.createClass({
  render: function (){
    return (
      <div className="col-lg-10">
      <input type="text" className="form-control" placeholder="Search"/>
      </div>

    )
  }
})
var ProductTable = React.createClass({
  render: function () {
    var rows = [];
    this.props.products.forEach (function (product) {
      rows.push (<ProductRow product={product} key={product._id}/>)
    });
    return (
      <table className="table" id="productstable">
        <thead>
          <tr>
              <th>#</th>
              <th>Product name</th>
              <th>description</th>
              <th>price</th>
              <th></th>
              <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      )
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
  return {products: []};
},
componentDidMount: function() {
    $.ajax({
      url: "/api/products/?search",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({products: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("api/products/?search", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
      <SearchBar />
      <ProductTable products={this.state.products} />
    </div>
    );
  }
});
ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('content')
);
