import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectUsers1768464509275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS project_users (
                id SERIAL NOT NULL,
                project_id int4 NOT NULL,
                user_id int4 NOT NULL,
                CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                CONSTRAINT PK_project_users_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE project_users;`);
    }

}
