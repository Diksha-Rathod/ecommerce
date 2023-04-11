import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class cart1669269705625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cart",
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
            name: "quantity",
            type: "int",
            default: "1",
          },
          {
            name: "totalAmount",
            type: "int",
          },
        ],
      }),
      true
    );
    await queryRunner.createForeignKey(
      "cart",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
      })
    );
    await queryRunner.createForeignKey(
      "cart",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
