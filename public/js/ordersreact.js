//App
//Product Search
//Product Table
//Product Row
// Order Table / Form
// Order row
var ProductRow = React.createClass({
    render: function() {
        var handleClick = function(product) {
            console.log(product)
            this.props.onOrderSubmit(product);
        };
        return (
            <tr onClick={this.props.onOrderSubmit.bind(this, this.props.product)}>
                <td>{this.props.product.ordernumber}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td className="text-right">
                    <div className="btn btn-xs btn-success">{this.props.product.price.toFixed(2)}
                        €</div>
                </td>
            </tr>
        );
    }
});
var ProductTable = React.createClass({
    handleOrderSubmit: function(product) {
        this.props.onOrderSubmit(product);
    },
    render: function() {
        var rows = [];
        this.props.products.forEach(function(product) {
            rows.push(<ProductRow product={product} key={product._id} onOrderSubmit={this.handleOrderSubmit}/>)
        }.bind(this));
        return (
            <table className="table table-hover" id="productstable">
                <thead>
                    <tr>
                        <th className="col-lg-1">#</th>
                        <th className="col-lg-4">Product name</th>
                        <th className="col-lg-5">description</th>
                        <th className="col-lg-2">price</th>
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
    render: function() {
        return (
            <div className="col-lg-12">
                <input type="text" className="form-control" placeholder="Search" value={this.props.filterText} ref="filterTextInput" onChange={this.handleSearch}/>
            </div>
        )
    }
});
var OrderRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.product.ordernumber}</td>
                <td>{this.props.product.name}</td>
                <td className="text-right">{this.props.product.price.toFixed(2)}€</td>
            </tr>
        )
    }
})
var OrderTable = React.createClass({
    render: function() {
        var rows = [];
        rows = this.props.orderlist.map(function(product, index) {
            return (<OrderRow product={product} key={index}/>)
        });
        var sum = 0;
        this.props.orderlist.forEach(function(element) {
            sum = sum + parseFloat(element.price);
        })
        return (
            <table className="table" id="OrderTable">
                <thead>
                    <tr>
                        <th className="col-lg-2">#</th>
                        <th className="col-lg-6">Product name</th>
                        <th className="col-lg-4">price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                    <tr>
                        <td></td>
                        <td>
                            <strong>Total:</strong>
                        </td>
                        <td className="text-right">
                            <strong>{sum.toFixed(2)}€</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
})
var OrderForm = React.createClass({
    render: function() {
        var orderhiddeninput = [];
        orderhiddeninput = this.props.orderlist.map(function(product, index) {
            return (<input type="hidden" name={"orderlist[" + index + "]"} value={product._id}/>)
        });
        return (
            <div>
                <OrderTable orderlist={this.props.orderlist}/> {/*<span className="pull-right">{sum.toFixed(2) + " "}€</span>*/}
                <form action={"/customers/" + customerid + "/orders"} id="orderform" method="post">
                    <textarea name="info" rows="4" className="form-control" placeholder="Additional Info"></textarea>
                    <br/> {orderhiddeninput}
                    <button className="btn btn-success">Order</button>
                </form>
            </div>
        )
    }
})
var App = React.createClass({
    getInitialState: function() {
        return {products: [], orderlist: []};
    },
    handleSearchSubmit: function(search) {
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
    handleOrderSubmit: function(product) {
        this.setState(function(state) {
            return {orderlist: state.orderlist.concat(product)}
        })
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <SearchBar onSearchSubmit={this.handleSearchSubmit}/>
                        <ProductTable products={this.state.products} onOrderSubmit={this.handleOrderSubmit}/>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <OrderForm orderlist={this.state.orderlist}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <App/>, document.getElementById('content'));
