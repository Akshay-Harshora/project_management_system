import { MigrationInterface, QueryRunner } from 'typeorm';

export class LookupsInsert1747221603351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT id FROM lookups WHERE name = 'Project Status' LIMIT 1) THEN
            INSERT INTO lookups (name, code, created_date)
            VALUES ('Project Status', 'PROJECT_STATUS', current_timestamp);
        END IF;
    END $$;
    `);
  }

  public async down(): Promise<void> {}
}
