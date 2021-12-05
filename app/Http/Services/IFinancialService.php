<?php
    namespace App\Http\Services;

    interface IFinancialService{
        public function cpGetCompanyProfile(string $pCompanyName);
        public function cpGetCompanyQuote(array $pCompanyNames);
    }

?>