import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComments1768464544089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL NOT NULL,
                text TEXT NOT NULL,
                task_id INTEGER,
                user_id INTEGER,
                created_at TIMESTAMP DEFAULT NOW(),
                CONSTRAINT fk_comment_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
                CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
                CONSTRAINT PK_comments_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE comments;`);
    }

}
