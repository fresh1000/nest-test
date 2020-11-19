import {MigrationInterface, QueryRunner} from "typeorm";

export class init1605801731899 implements MigrationInterface {
    name = 'init1605801731899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "playerId" uuid, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_894dc6980a4da7710fb40a0ae1e" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_894dc6980a4da7710fb40a0ae1e"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
