<?php

namespace App\Logging;

use Monolog\Logger as MonologLogger;
use Illuminate\Log\Logger as IlluminateLogger;

class CustomizeLogger
{
    /**
     * Personaliza o logger adicionando o processador customizado.
     *
     * @param  mixed  $logger
     * @return void
     */
    public function __invoke($logger)
    {
        // Se for uma instância do logger do Laravel, obtenha o Monolog real
        if ($logger instanceof IlluminateLogger) {
            $logger = $logger->getLogger();
        }
        
        // Agora $logger é uma instância de Monolog\Logger
        $logger->pushProcessor(new CustomProcessor());
    }
}