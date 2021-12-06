import React, { Component } from 'react';
import Swal from 'sweetalert2';
import ProfileTbl from './components/ProfileTbl';
import PrivateRoute from './PrivateRoute';
import FinanceService from './Services/FinanceService';
import Select from 'react-select';
import QuoteTbl from './components/QuoteTbl';
import { Navigate } from 'react-router-dom';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            mFinanceService: new FinanceService(),
            result:null,
            resultQuotes:null,
            companyName:"",
            companyNames:[],
            profileLoading :false,
            quoteLoading:false,
            redirectTo: null
        }
    }

    fetchProfile(event) {
        const {mFinanceService, companyName} = this.state;
        if(companyName !== ""){
            mFinanceService.getProfile(companyName).then((res) => {
                if (res.status == 200) {
                    this.setState({
                        result: res.data.pResultObj
                    });
                }
                else {
                    Swal.fire({
                        title: 'Unsuccessful',
                        text: res.data.message,
                        timer: 2000,
                        type: 'warning'
                    });
                }
            })
            .catch(function (err) {
                // if(err.status === 401){
                    this.setState({redirectTo:<Navigate to="/login" />});
                // }
                // else{
                //     Swal.fire({
                //         title: 'Encountered Error',
                //         text: err.message,
                //         timer: 2000,
                //         type: 'error'
                //     });
                // }
            }).finally(()=>{
                this.setState({
                    profileLoading:false
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

    fetchQuote(){
        const {mFinanceService, companyNames} = this.state;

        let compNames = [];
        companyNames.forEach(element => {
            compNames.push(element.value);
        }); 

        if(companyNames.length !== 0){
            mFinanceService.getQuotes(compNames).then((res) => {
                if (res.status == 200) {
                    this.setState({
                        resultQuotes: res.data.pResultObj,
                    });
                }
                else {
                    Swal.fire({
                        title: 'Unsuccessful',
                        text: res.data.message,
                        timer: 2000,
                        type: 'warning'
                    });
                }
            })
            .catch(function (err) {
                // if(err.status === 401){
                    this.setState({redirectTo:<Navigate to="/login" />});
                // }
                // else{
                    // Swal.fire({
                    //     title: 'Encountered Error',
                    //     text: err.message,
                    //     timer: 2000,
                    //     type: 'error'
                    // });
                // }
            }).finally(()=>{
                this.setState({
                    quoteLoading:false
                });
            });
        }
        else{
            Swal.fire({
                title: 'Oops',
                text: "Please select a company name to search",
                type: 'warning'
            });
        }
    }

    render() {
        const {companyName, result, resultQuotes,profileLoading,quoteLoading,redirectTo} = this.state;
        const options = [
            { value: 'AAPL', label: 'AAPL' },
            { value: 'FB', label: 'FB' },
            { value: 'GOOG', label: 'GOOG' }
        ]

        return (
            <div className="container "> 
                <div className="pt-5 h2 w-100 text-left">
                    <div className="col-12">Search Company Profile</div>
                </div>
                <div className="form-container">
                    <div className="form-wrap">
                        <div className="row no-gutters mb-3">
                            <div className="col-8">
                                <input
                                    type="text"
                                    value={companyName}
                                    className="form-control"
                                    placeholder="Company Name"
                                    onChange={event =>
                                        this.setState({companyName:event.target.value})
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                    onClick={event => {
                                        this.setState({
                                            profileLoading:true
                                        });
                                        this.fetchProfile(event);
                                    }}
                                >
                                    Search Profile
                                </button>
                            </div>
                            {profileLoading ? <div className="col-1 loading">Loading...</div>:null}
                        </div>
                    </div>
                </div>
                <ProfileTbl company_profile={result}></ProfileTbl>
                <div className="pt-5 h2 w-100 text-left">
                    <div className="col-12">Search Company Quote</div>
                </div>
                <div className="form-container">
                    <div className="form-wrap">
                        <div className="row no-gutters mb-3">
                            <div className="col-8">
                                <Select
                                    isMulti
                                    name="companies"
                                    options={options}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={val => {
                                        this.setState({companyNames:val});
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                    onClick={event => {
                                        this.setState({
                                            quoteLoading:true
                                        });
                                        this.fetchQuote(event);
                                    }}
                                >
                                    Search Quote
                                </button>
                            </div>
                            {quoteLoading ? <div className="col-1 loading" style={{display:`$`}}>Loading...</div>:null}
                        </div>
                    </div>
                </div>
                <QuoteTbl company_quotes={resultQuotes}></QuoteTbl>
                {redirectTo}
            </div>
        );
    };
}

export default PrivateRoute(Home);