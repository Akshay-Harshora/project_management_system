import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjects1768464491897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL NOT NULL,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                created_date timestamp(3) without time zone NOT NULL,
                created_by VARCHAR(50),
                modified_date timestamp(3) without time zone,
                modified_by VARCHAR(50),
                CONSTRAINT PK_projects_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE projects;`);
    }

}
