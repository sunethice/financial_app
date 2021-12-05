<?php
    namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FinancialService implements IFinancialService{
        private $cAPIKey = "78de4df1615ab8800334cffa51cdedee";

        public function __construct()
        {   
        }

        public function cpGetCompanyProfile(string $pCompanyName){
            //profile/AAPL?apikey=YOUR_API_KEY
            $response = $this->cpSendApiRequest("profile/".$pCompanyName, 'get');
            return $response->json();
        }

        public function cpGetCompanyQuote(array $pCompanyNames){
            //quote/AAPL?apikey=YOUR_API_KEY
            $mCompanyNames = array_reduce($pCompanyNames,function($val,$current){
                return $val.",".$current;
            },"");
            $response = $this->cpSendApiRequest("quote/".$mCompanyNames, 'get');
            return $response->json();
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