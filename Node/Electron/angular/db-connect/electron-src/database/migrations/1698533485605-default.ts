import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698533485605 implements MigrationInterface {
    name = 'Default1698533485605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "role_id" varchar, CONSTRAINT "REL_3bad667ed90ba9cb4c83411841" UNIQUE ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "Roles" ("id" varchar PRIMARY KEY NOT NULL, "role" varchar(20) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_Users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "role_id" varchar, CONSTRAINT "REL_3bad667ed90ba9cb4c83411841" UNIQUE ("role_id"), CONSTRAINT "FK_3bad667ed90ba9cb4c834118416" FOREIGN KEY ("role_id") REFERENCES "Roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Users"("id", "name", "email", "role_id") SELECT "id", "name", "email", "role_id" FROM "Users"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`ALTER TABLE "temporary_Users" RENAME TO "Users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" RENAME TO "temporary_Users"`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "role_id" varchar, CONSTRAINT "REL_3bad667ed90ba9cb4c83411841" UNIQUE ("role_id"))`);
        await queryRunner.query(`INSERT INTO "Users"("id", "name", "email", "role_id") SELECT "id", "name", "email", "role_id" FROM "temporary_Users"`);
        await queryRunner.query(`DROP TABLE "temporary_Users"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
