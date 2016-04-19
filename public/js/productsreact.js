var ProductRow = React.createClass({
  render: function () {
    var deletebutton = this.props.product.deleted ?
      <td>
         <form id="undelete-form" action={"/products/"+  this.props.product._id +"?_method=PUT"} method="POST">
           <input type="hidden" value="false" name="product[deleted]"/>
           <button className="btn">undelete</button>
        </form>
      </td>
      :
      <td>
          <form id="delete-form" action={"/products/"+  this.props.product._id + "?_method=DELETE" }method="POST">
            <button className="btn btn-danger">Delete</button>
          </form>
      </td>;

    var editbutton = this.props.product.deleted ?
      <td></td>
      :
      <td>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editproduct" data-product-id={this.props.product._id}>Edit</button>
      </td>;



    var trClass = this.props.product.deleted ? "disabled active":"";
    return (
      <tr className={trClass}>
        <td>{this.props.product.ordernumber}</td>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.description}</td>
        <td>{this.props.product.price} €</td>
        {editbutton}
        {deletebutton}
      </tr>
    );
  }
});
var ProductaddButton = React.createClass ({
  render: function (){
    return (
      <div className="col-lg-2">
          <button type="button" className="btn btn-primary center-block" data-toggle="modal" data-target="#newproduct">
              Add product
          </button>
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
              <th className="col-lg-1">#</th>
              <th className="col-lg-3">Product name</th>
              <th className="col-lg-5">description</th>
              <th className="col-lg-1">price</th>
              <th className="col-lg-1"></th>
              <th className="col-lg-1"></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      )
  }
});


var SearchBar = React.createClass({
  handleSearch: function() {
    this.props.onSearchSubmit(this.refs.filterTextInput.value);
  },
  render: function (){
    return (
      <div className="col-lg-10">
      <input type="text" className="form-control" placeholder="Search" value={this.props.filterText} ref="filterTextInput" onChange={this.handleSearch}/>
      </div>

    )
  }
})


var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {products: []};
  },
  handleSearchSubmit: function (search) {
      $.ajax({
        url: "/api/products?search=" + search,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({products: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("api/products/", status, err.toString());
        }.bind(this)
      });
  },
  componentDidMount: function() {
    $.ajax({
      url: "/api/products/",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({products: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/api/products/", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <SearchBar onSearchSubmit={this.handleSearchSubmit}/>
          <ProductaddButton />
        </div>
        <ProductTable products={this.state.products} />
      </div>
    );
  }
});
ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('content')
);
