import React, { Component } from "react";

class QuoteRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <tr>
                <td>{this.props.quote !== undefined?this.props.quote.name:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.symbol:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.price:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.dayHigh:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.dayLow:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.yearHigh:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.yearLow:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.marketCap:""}</td>
                <td>{this.props.quote !== undefined?this.props.quote.eps:""}</td>
            </tr>
        );
    }
}

export default QuoteRow;