var CustomerRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.customer.name}</td>
        <td>{this.props.customer.phone}</td>
        <td>{this.props.customer.street} {this.props.customer.housenumber} {this.props.customer.city}</td>
        <td> <button type='button' className='btn btn-primary' data-toggle='modal' data-target='#editCustomer' data-customer-id= {this.props.customer._id}>Edit</button></td>
        <td><a href={"customers/" + this.props.customer._id + "/orders/new"} className='btn btn-success'>New order</a></td>
      </tr>
    );
  }
});
var CustomeraddButton = React.createClass ({
  render: function (){
    return (
      <div className="col-lg-2">
          <button type="button" className="btn btn-primary center-block" data-toggle="modal" data-target="#newcustomer">
              Add product
          </button>
      </div>
    )
  }
})

var CustomerTable = React.createClass({
  render: function () {
    var rows = [];
    var rows =  this.props.customers.map (function (customer) {
     return (<CustomerRow customer={customer} key={customer._id}/>)
   });
    return (
      <table className="table" id="customertable">
        <thead>
          <tr>
            <th className='col-lg-2'>Name</th>
            <th className='col-lg-3'>Phone</th>
            <th className='col-lg-5'>Address</th>
            <th className='col-lg-1'>edit</th>
            <th className='col-lg-1'>new</th>
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


var FilterableCustomerTable = React.createClass({
  getInitialState: function() {
    return {customers: []};
  },
  handleSearchSubmit: function (search) {
      $.ajax({
        url: "/api/customers?search=" + search,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({customers: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("api/customers/", status, err.toString());
        }.bind(this)
      });
  },
  componentDidMount: function() {
    $.ajax({
      url: "/api/customers/",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({customers: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("/api/customers/", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <SearchBar onSearchSubmit={this.handleSearchSubmit}/>
          <CustomeraddButton />
        </div>
        <CustomerTable customers={this.state.customers} />
      </div>
    );
  }
});
ReactDOM.render(
  <FilterableCustomerTable />,
  document.getElementById('content')
);
