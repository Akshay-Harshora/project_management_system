import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLookups1768557643735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS lookups (
              id serial NOT NULL,
              code varchar(255) NOT NULL,
              name varchar(255) NOT NULL,
              is_active bool DEFAULT true NOT NULL,
              created_date timestamp(3) without time ZONE NOT NULL,
              created_by varchar(50) NULL,
              modified_date timestamp(3) without time ZONE NULL,
              modified_by varchar(50) NULL,
              CONSTRAINT lookups_code_key UNIQUE (code),
              CONSTRAINT lookups_pkey PRIMARY KEY (id)
          );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE lookups`);
    }

}
