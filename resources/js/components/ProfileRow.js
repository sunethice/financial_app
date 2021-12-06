import React, { Component } from "react";

class ProfileRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <tr>
                <td>{this.props.profile !== undefined?this.props.profile.companyName:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.ceo:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.cusip:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.dcf:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.dcfDiff:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.exchange:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.exchangeShortName:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.mktCap:""}</td>
                <td>{this.props.profile !== undefined?this.props.profile.sector:""}</td>
            </tr>
        );
    }
}

export default ProfileRow;