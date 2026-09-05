import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'mysql' as const,
				host: config.get<string>('DB_HOST', 'localhost'),
				port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
				username: config.get<string>('DB_USERNAME', 'root'),
				password: config.get<string>('DB_PASSWORD', ''),
				database: config.get<string>('DB_DATABASE', 'autofix_pro'),
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
	],
})
export class DatabaseModule {}
