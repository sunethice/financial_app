<?php

namespace App\Http\Services;

use App\Http\Traits\HBRedisTrait;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FinancialService implements IFinancialService{

        use HBRedisTrait;
        private $cAPIKey = "78de4df1615ab8800334cffa51cdedee";

        public function __construct()
        {   
        }

        public function cpGetCompanyProfile(string $pCompanyName){
            $mKey = "Profile_".strtolower($pCompanyName);
            $response = null;
            if($this->cpKeyExists($mKey)){
                $response = json_decode($this->cpGetCachedDetails($mKey));
            }
            else{
                $response = $this->cpSendApiRequest("profile/".$pCompanyName, 'get');
                $this->cpCacheDetails($mKey,json_encode($response->json()));
                $response = $response->json();
            }
            return $response;
        }

        public function cpGetCompanyQuote(array $pCompanyNames){
            $mCompanyNames = array_reduce($pCompanyNames,function($val,$current){
                return $val.",".$current;
            },"");
            $mKey = "Quote".strtolower($mCompanyNames);
            $response = null;
            if($this->cpKeyExists($mKey)){
                $response = json_decode($this->cpGetCachedDetails($mKey));
            }
            else{
                $response = $this->cpSendApiRequest("quote/".$mCompanyNames, 'get');
                $this->cpCacheDetails($mKey,json_encode($response->json()));
                $response = $response->json();
            }
            return $response;
        }

        public function cpSendApiRequest($pPath, $pRequestType)
        {
            $mBaseURL = "https://financialmodelingprep.com/api/v3/";
            $response = [];
            try {
                if ($pRequestType == 'get') {
                    $response = Http::withHeaders([
                        'Accept' => 'application/json',
                        'Accept-Encoding' => 'gzip'
                    ])->get($mBaseURL . $pPath . "?apikey=".$this->cAPIKey);
                } else {
                   
                }
                // Determine if the status code is >= 400...
                $mFailed = $response->failed();
                // Determine if the response has a 400 level status code...
                $mClientError = $response->clientError();

                // Determine if the response has a 500 level status code...
                $mServerError = $response->serverError();
                if ($mFailed or $mClientError or $mServerError) {
                    $response->throw();
                }
                return $response;
            } catch (\Exception $e) {
                Log::info($e->getMessage());
                // handle other exceptions such as ConnectionException
                return $response;
            }
        }
    }
?>