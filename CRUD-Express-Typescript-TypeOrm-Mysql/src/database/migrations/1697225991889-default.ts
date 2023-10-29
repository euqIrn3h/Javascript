import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697225991889 implements MigrationInterface {
    name = 'Default1697225991889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` text NOT NULL, \`role_id\` varchar(36) NULL, UNIQUE INDEX \`REL_3bad667ed90ba9cb4c83411841\` (\`role_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Roles\` (\`id\` varchar(36) NOT NULL, \`role\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Subjects\` (\`id\` varchar(36) NOT NULL, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Videos\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(100) NOT NULL, \`url\` text NOT NULL, \`description\` text NULL, \`room_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Rooms\` (\`id\` varchar(36) NOT NULL, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room_subject\` (\`room_id\` varchar(36) NOT NULL, \`subject_id\` varchar(36) NOT NULL, INDEX \`IDX_f227421d2ef64ab086261ac07f\` (\`room_id\`), INDEX \`IDX_a05f10c497f5f7db3022664a6d\` (\`subject_id\`), PRIMARY KEY (\`room_id\`, \`subject_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Users\` ADD CONSTRAINT \`FK_3bad667ed90ba9cb4c834118416\` FOREIGN KEY (\`role_id\`) REFERENCES \`Roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Videos\` ADD CONSTRAINT \`FK_2e75e3fc0f660900b12d705a253\` FOREIGN KEY (\`room_id\`) REFERENCES \`Rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD CONSTRAINT \`FK_f227421d2ef64ab086261ac07fd\` FOREIGN KEY (\`room_id\`) REFERENCES \`Subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD CONSTRAINT \`FK_a05f10c497f5f7db3022664a6d6\` FOREIGN KEY (\`subject_id\`) REFERENCES \`Rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP FOREIGN KEY \`FK_a05f10c497f5f7db3022664a6d6\``);
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP FOREIGN KEY \`FK_f227421d2ef64ab086261ac07fd\``);
        await queryRunner.query(`ALTER TABLE \`Videos\` DROP FOREIGN KEY \`FK_2e75e3fc0f660900b12d705a253\``);
        await queryRunner.query(`ALTER TABLE \`Users\` DROP FOREIGN KEY \`FK_3bad667ed90ba9cb4c834118416\``);
        await queryRunner.query(`DROP INDEX \`IDX_a05f10c497f5f7db3022664a6d\` ON \`room_subject\``);
        await queryRunner.query(`DROP INDEX \`IDX_f227421d2ef64ab086261ac07f\` ON \`room_subject\``);
        await queryRunner.query(`DROP TABLE \`room_subject\``);
        await queryRunner.query(`DROP TABLE \`Rooms\``);
        await queryRunner.query(`DROP TABLE \`Videos\``);
        await queryRunner.query(`DROP TABLE \`Subjects\``);
        await queryRunner.query(`DROP TABLE \`Roles\``);
        await queryRunner.query(`DROP INDEX \`REL_3bad667ed90ba9cb4c83411841\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
    }

}
