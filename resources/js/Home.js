import React, { Component } from 'react';
import Swal from 'sweetalert2';
import ProfileTbl from './components/ProfileTbl';
import PrivateRoute from './PrivateRoute';
import FinanceService from './Services/FinanceService';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            mFinanceService: new FinanceService(),
            result:null,
            comapanyName:""
        }
    }

    fetchProfile(event) {
        const {mFinanceService, comapanyName} = this.state;
        if(comapanyName !== ""){
            mFinanceService.getProfile(comapanyName).then((res) => {
                if (res.status == 200) {
                    this.setState({
                        result: res.data.pResultObj,
                    });
                } else {
                    Swal.fire({
                        title: 'Unsuccessful',
                        text: res.data.message,
                        timer: 2000,
                        type: 'warning'
                    });
                }
            })
            .catch(function (err) {
                Swal.fire({
                    title: 'Encountered Error',
                    text: err.message,
                    timer: 2000,
                    type: 'error'
                });
            });
        }
        else{
            Swal.fire({
                title: 'Oops',
                text: "Please enter a company name to search",
                type: 'warning'
            });
        }
    }

    render() {
        const {comapanyName,result} = this.state;
        return (
            <div className="container "> 
                <div className="pt-5 h2 w-100 text-left">
                    <div className="col-12">Search Company Profile</div>
                </div>
                <div className="form-container">
                    <div className="form-wrap">
                        <div className="row no-gutters mb-3">
                            <div className="col-10">
                                <input
                                    type="text"
                                    value={comapanyName}
                                    className="form-control"
                                    placeholder="Company Name"
                                    onChange={event =>
                                        this.setState({comapanyName:event.target.value})
                                    }
                                />
                            </div>
                            <div className="col-2">
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                    onClick={event => {
                                        this.fetchProfile(event);
                                    }}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ProfileTbl company_profile={result}></ProfileTbl>
            </div>
        );
    };
}

export default PrivateRoute(Home);