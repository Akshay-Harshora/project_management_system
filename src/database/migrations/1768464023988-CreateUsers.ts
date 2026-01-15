import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1768464023988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL NOT NULL,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(10) NOT NULL DEFAULT 'USER',
                created_date timestamp(3) without time zone NOT NULL,
                created_by VARCHAR(50),
                modified_date timestamp(3) without time zone,
                modified_by VARCHAR(50),
                CONSTRAINT PK_users_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users;`);
    }

}
