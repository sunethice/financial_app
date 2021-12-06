import React, { Component } from "react";
import FinanceService from "../Services/FinanceService";
import Swal from 'sweetalert2';
import QuoteRow from "./QuoteRow";

class QuoteTbl extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <>
                <div>
                    <div id="package_wrap" className="table-responsive">
                        <table className="table table-sm">
                            <thead>
                                <tr className="table-secondary">
                                    <td>Name</td>
                                    <td>Symbol</td>
                                    <td>Price</td>
                                    <td>Day High</td>
                                    <td>Day Low</td>
                                    <td>Year High</td>
                                    <td>Year Low</td>
                                    <td>Market Capital</td>
                                    <td>EPS</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.company_quotes && this.props.company_quotes.length != 0 ? (
                                    this.props.company_quotes.map(item => (
                                        <QuoteRow
                                            key={item.symbol}
                                            quote={item}
                                        ></QuoteRow>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan="9">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
export default QuoteTbl;