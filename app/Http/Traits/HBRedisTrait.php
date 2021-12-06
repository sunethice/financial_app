<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

trait HBRedisTrait
{
    public function cpCacheDetails($pCacheKey, $pCacheDetails)
    {
        Redis::set($pCacheKey, $pCacheDetails, 'EX', 900); //expire in 15min
    }

    public function cpGetCachedDetails($pCacheKey)
    {
        return Redis::get($pCacheKey);
    }

    public function cpKeyExists($pCacheKey)
    {
        return Redis::exists($pCacheKey);
    }

    public function cpDeleteKey($pCacheKey)
    {
        Redis::del($pCacheKey);
    }

    public function cpListKeys()
    {
        return Redis::keys('*');
    }
}
