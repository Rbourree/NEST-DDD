import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Tu peux ajuster les niveaux de logs selon l’environnement
  constructor() {
    super({
      log: ['warn', 'error'], // ou ['query', 'info', 'warn', 'error'] en dev
    });
  }

  async onModuleInit() {
    // Ouvre la connexion dès que Nest démarre
    await this.$connect();
  }

  async onModuleDestroy() {
    // Ferme proprement la connexion quand Nest s’arrête
    await this.$disconnect();
  }

  /** Utilitaire pratique pour exécuter une transaction Prisma
   *   await prisma.$transaction(fn);
   */
}
