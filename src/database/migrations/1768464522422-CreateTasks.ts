import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasks1768464522422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL NOT NULL,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                project_id INTEGER,
                assigned_user_id INTEGER,
                created_at TIMESTAMP DEFAULT NOW(),
                CONSTRAINT fk_task_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
                CONSTRAINT fk_task_user FOREIGN KEY (assigned_user_id) REFERENCES users(id) ON DELETE SET NULL,
                CONSTRAINT PK_tasks_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE tasks;`);
    }

}
