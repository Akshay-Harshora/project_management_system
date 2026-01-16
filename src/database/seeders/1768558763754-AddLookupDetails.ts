import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLookupDetails1768558763754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            DECLARE
                project_status_lookup_id INTEGER;
            BEGIN

            SELECT id INTO project_status_lookup_id
            FROM lookups
            WHERE code = 'PROJECT_STATUS'  
            LIMIT 1;

            IF NOT EXISTS (SELECT id FROM lookup_details WHERE name = 'Active' AND lookup_id = project_status_lookup_id LIMIT 1) THEN
                    INSERT INTO lookup_details (name, code, created_date,lookup_id)
                    VALUES ('Active', 'ACTIVE', current_timestamp, project_status_lookup_id);
            END IF;

            IF NOT EXISTS (SELECT id FROM lookup_details WHERE name = 'Completed' AND lookup_id = project_status_lookup_id LIMIT 1) THEN
                    INSERT INTO lookup_details (name, code, created_date,lookup_id)
                    VALUES ('Completed', 'COMPLETED', current_timestamp, project_status_lookup_id);
            END IF;

            IF NOT EXISTS (SELECT id FROM lookup_details WHERE name = 'Archived' AND lookup_id = project_status_lookup_id LIMIT 1) THEN
                    INSERT INTO lookup_details (name, code, created_date,lookup_id)
                    VALUES ('Archived', 'ARCHIVED', current_timestamp, project_status_lookup_id);
            END IF;

            END $$;
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
