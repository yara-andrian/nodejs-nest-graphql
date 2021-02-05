import {MigrationInterface, QueryRunner} from "typeorm";

export class articleTableCreation1612451377302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE "article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "tldr" text NOT NULL, "context" text NOT NULL, "crop" text NOT NULL, "country" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "article_pk" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_UserId_Article" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`CREATE TABLE "article_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid,"details" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "articleId" uuid, CONSTRAINT "article_comment_pk" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "article_comment" ADD CONSTRAINT "FK_ArticleId_Comment" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "article_comment" ADD CONSTRAINT "FK_UserId_Comment" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_UserId_Article"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`ALTER TABLE "article_comment" DROP CONSTRAINT "FK_ArticleId_Comment"`);
        await queryRunner.query(`ALTER TABLE "article_comment" DROP CONSTRAINT "FK_ArticleId_Comment"`);
        await queryRunner.query(`DROP TABLE "article_comment"`);
    }
}
