<?php

namespace App\Logging;

use Illuminate\Support\Facades\Auth;
use Monolog\LogRecord;

class CustomProcessor
{
    public function __invoke(array|LogRecord $record)
    {
        // Definimos um userId default
        $userId = 'unknown';

        // Se houver Auth, use Auth::id()
        if (Auth::check()) {
            $userId = Auth::id();
        }
        // Se a função session() estiver disponível e a sessão estiver iniciada, use-a
        elseif (function_exists('session') && session()) {
            $userId = session()->get('logged_user_id', 'unknown');
        }

        // Localização padrão
        $location = 'default-location-not-found';

        // Se houver request disponível e não estiver em console, use a URL
        if (
            function_exists('request')
            && request()
            && !app()->runningInConsole() // evita erro em jobs/artisan
        ) {
            $location = request()->fullUrl();
        }

        // Tenta extrair caminho de view a partir da mensagem
        if (
            (is_array($record)
                && isset($record['message'])
                && preg_match('/\(View:\s*(.*?)\)/', $record['message'], $matches)
            )
            || ($record instanceof LogRecord
                && preg_match('/\(View:\s*(.*?)\)/', $record->message, $matches)
            )
        ) {
            $location = $matches[1];
        }

        // Trata se $record for array ou LogRecord (Monolog 3)
        if (is_array($record)) {
            $record['context']['userId'] = $userId;
            $record['context']['rota']   = $location;
            $record['route']             = $location; // se quiser no nível de cima
            return $record;
        } elseif ($record instanceof LogRecord) {
            $newContext = $record->context;
            $newContext['userId'] = $userId;
            $newContext['rota']   = $location;
            $newContext['route']  = $location;

            return new LogRecord(
                $record->datetime,
                $record->channel,
                $record->level,
                $record->message,
                $newContext,
                $record->extra
            );
        }

        return $record;
    }
}