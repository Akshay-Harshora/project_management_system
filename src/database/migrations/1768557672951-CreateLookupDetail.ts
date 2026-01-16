import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLookupDetail1768557672951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS lookup_details (
              id serial NOT NULL,
              code varchar(255) NOT NULL,
              name varchar(255) NOT NULL,
              description varchar(255) NULL,
              lookup_id int4 NOT NULL,
              is_active bool DEFAULT true NOT NULL,
              created_date timestamptz NOT NULL,
              created_by varchar(50) NULL,
              modified_date timestamptz NULL,
              modified_by varchar(50) NULL,
              CONSTRAINT lookup_details_lookup_id_code_key UNIQUE (lookup_id, code),
              CONSTRAINT lookup_details_name_unique_key UNIQUE (lookup_id, name),
              CONSTRAINT lookup_details_pkey PRIMARY KEY (id),
              CONSTRAINT lookup_id_fkey FOREIGN KEY (lookup_id) REFERENCES lookups(id) ON DELETE RESTRICT
          );`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE lookup_details`);
    }

}
