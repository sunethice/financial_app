<?php

namespace App\Http\Controllers;

use App\Http\Services\IFinancialService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class FinancialController extends BaseController
{
    private $cIFinancialService;
    public function __construct(IFinancialService $pIFinancialService){
        $this->cIFinancialService = $pIFinancialService;
    }

    public function cpGetCompanyProfile(Request $pRequest){
        $mValidator = Validator::make($pRequest->all(),[
            'company_name'=>'required|string'
        ]);

        if($mValidator->fails()){
            return $this->cpFailureResponse(422,$mValidator->failed());
        }
        try{
            $mResponse = $this->cIFinancialService->cpGetCompanyProfile($pRequest['company_name']);
            return $this->cpResponseWithResults($mResponse,"Company profile retrieved successfully");
        }catch(Exception $pEx){
            $this->cpFailureResponse($pEx->getCode(),$pEx->getMessage());
        }
    }

    public function cpGetCompanyQuote(Request $pRequest){
        $mValidator = Validator::make($pRequest->all(),[
            'company_names'=>'required|array'
        ]);

        if($mValidator->fails()){
            return $this->cpFailureResponse(422,$mValidator->failed());
        }
        try{
            $mResponse = $this->cIFinancialService->cpGetCompanyQuote($pRequest['company_names']);
            return $this->cpResponseWithResults($mResponse,"Company quote retrieved successfully",200);
        }catch(Exception $pEx){
            $this->cpFailureResponse($pEx->getCode(),$pEx->getMessage());
        }
    }
}
