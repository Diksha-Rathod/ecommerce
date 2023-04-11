import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class product1669269683651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isNullable: false,
            isGenerated: true,
          },
          {
            name: "fullName",
            type: "varchar",
          },
          {
            name: "details",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "price",
            type: "int",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
