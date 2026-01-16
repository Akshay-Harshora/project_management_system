import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProjects1768559446860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                  ALTER TABLE projects 
                  ADD COLUMN IF NOT EXISTS project_status_id INTEGER;

                  ALTER TABLE projects
                  ADD CONSTRAINT FK_projects_project_status
                  FOREIGN KEY (project_status_id)
                  REFERENCES lookup_details(id)
                  ON DELETE RESTRICT;
                  `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
