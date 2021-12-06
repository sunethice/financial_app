import React, { Component } from "react";
import FinanceService from "../Services/FinanceService";
import Swal from 'sweetalert2';
import ProfileRow from "./ProfileRow";

class ProfileTbl extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profileObj: null,
        };
    }

    componentDidMount() { }

    

    render() {
        const { profileObj } = this.state;
        return (
            <>
                <div>
                    <div id="package_wrap" className="table-responsive">
                        <table className="table table-sm">
                            <thead>
                                <tr className="table-secondary">
                                    <td>Company Name</td>
                                    <td>CEO</td>
                                    <td>CUSIP</td>
                                    <td>DCF</td>
                                    <td>DCF Diff</td>
                                    <td>exchange</td>
                                    <td>exchange shortname</td>
                                    <td>Market Capital</td>
                                    <td>Sector</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.company_profile !== undefined && this.props.company_profile !== null ? (
                                        <ProfileRow
                                            key={0}
                                            profile={this.props.company_profile[0]}
                                        ></ProfileRow>
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
export default ProfileTbl;