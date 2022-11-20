import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as rabbit from 'amqplib';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BrokerManagerService implements OnApplicationShutdown {


  private logger = new Logger(BrokerManagerService.name);
  private connection: rabbit.Connection;
  private channel: rabbit.Channel;
  public queues = ["consumed.account", "consumed.credit-card-account", "consumed.loan", "consumed.financing", "consumed.unarranged-account-overdraft", "consumed.invoice_financing"];

  public exchange = 'bank-receiver-consumed.x';
  public deadLetterExchange = `bank-receiver-consumed.dx`;
  public deadLetterQueue = `bank-receiver-consumed.dl`;
  constructor(private config:ConfigService, private eventEmitter: EventEmitter2) {
    this.init();
  }

  onApplicationShutdown(signal?: string) 
  {
    this.logger.warn(`Fechando conexão com o RabbitMQ - signal ${signal}`);

    if (this.connection) {
      this.connection.close();
    }

    if (this.channel) {
      this.channel.close();
    }
  }

  /**
   * Conecta no RabbitMQ e configura as filas parametrizadas no ambiente.
   */
  async init() 
  {
    try 
    {
      this.logger.debug(`[init] - Iniciando configuração do RabbitMQ`);

      const connection = await this.getConnection();
      this.channel = await connection.createChannel();

      await this.channel.assertExchange(this.exchange, 'direct', { durable: false });

      if (this.queues) 
      {
        await this.channel.assertExchange(this.deadLetterExchange, 'direct', { durable: false });
        await this.channel.assertQueue(this.deadLetterQueue, {  durable: false, maxLength: 1000 });
        await this.channel.bindQueue(this.deadLetterQueue, this.deadLetterExchange, this.deadLetterQueue);

        const args = {
          'x-dead-letter-exchange': this.deadLetterExchange,
          'x-dead-letter-routing-key': this.deadLetterQueue,
        };

        for(const queue of this.queues)
        { 
          this.logger.debug(`[init] - Configurando FILA >>> NAME ${queue} - ROUTER_KEY ${queue}`);
          await this.channel.assertQueue(queue, { durable: false, arguments: args });
          await this.channel.bindQueue( queue, this.exchange, queue);
        } 

      }

      this.eventEmitter.emit(
        'queues.created',
        {
          queues: this.queues
        }
      );
      
    } 
    catch (e) 
    {
      this.logger.error(`ERRO NA INICIALIZAÇÃO DO RABBITMQ `, e);
    }
  }


  public async consumer(queue: string, onMessage: (msg: any) => void)
  {
    const channel = await this.getChannel();
    channel.consume(queue, (msg) => onMessage(msg), { noAck: true });
  }

  /**
   * Publica na exchange a mensagem passada através da router key.
   *
   * @param queue
   * @param message
   * @returns
   */
  public async publish(queue: string, message: any) 
  {
      const messageStr = JSON.stringify(message);
      try 
      {
            this.logger.log(
              `\n---------- [publish] ------------\n>>> EXCHANGE ${this.exchange}\n>>> ROUTER_KEY ${queue}\n>>>MESSAGE.length ${messageStr.length}\n -----------------------------`,
            );
            const channel = await this.getChannel();
            channel.publish(this.exchange, queue, Buffer.from(messageStr), {expiration: 60000});
          
      } 
      catch (e) 
      {
        this.logger.error(
          `[publish] - Erro na tentativa de publicar no RabbitMQ - queue ${queue}`,
          e,
        );
      }

  }

  async getChannel() 
  {
    if (!this.channel) 
    {
      await this.init();
    }

    return this.channel;
  }

  async getConnection() 
  {
    
    if (!this.connection) 
    {
      const user = this.config.get('RABBIT_MQ_USER', 'guest');
      const pass = this.config.get('RABBIT_MQ_PASS', 'guest');
      const host = this.config.get('RABBIT_MQ_URL', 'localhost');
      const port = this.config.get('RABBIT_MQ_PORT', '5672');

      const urlConnect = `amqp://${user}:${pass}@${host}:${port}`;

      this.connection = await rabbit.connect(urlConnect);
    }

    return this.connection;
  }
}
