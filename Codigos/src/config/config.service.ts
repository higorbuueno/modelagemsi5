// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config(); 
class ConfigDatabaseService {
  constructor(private env: { [k: string]: string | undefined }) { }
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }
  public getPort() {
    return this.getValue('PORT', true);
  }
  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      name: 'default',
      host: this.getValue('TYPEORM_HOST'),
      port: parseInt(this.getValue('TYPEORM_PORT')),
      username: this.getValue('TYPEORM_USERNAME'),
      password: '',
      database: this.getValue('TYPEORM_DATABASE'),
      migrationsRun: Boolean(this.getValue('TYPEORM_MIGRATIONS')),
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: true,
      migrationsTableName: 'migrations',
      synchronize: false,
      migrations: ['dist/db/migrations/{*.ts,*.js}'],

      ssl: this.isProduction(),
    };
  }
}
const configDatabaseService = new ConfigDatabaseService(process.env)
  .ensureValues([
    'TYPEORM_HOST',
    'TYPEORM_PORT',
    'TYPEORM_USERNAME',
    'TYPEORM_PASSWORD',
    'TYPEORM_DATABASE'
  ]);
export { configDatabaseService };