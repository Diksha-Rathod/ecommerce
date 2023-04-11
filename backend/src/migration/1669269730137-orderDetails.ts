import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class orderDetails1669269730137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orderDetails",
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
            isNullable: false,
          },
          {
            name: "amountCreatedAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleteAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updateAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );
    await queryRunner.createForeignKey(
      "orderDetails",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
      })
    );
    await queryRunner.createForeignKey(
      "orderDetails",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
      })
    );
    await queryRunner.createForeignKey(
      "orderDetails",
      new TableForeignKey({
        columnNames: ["paymentId"],
        referencedColumnNames: ["id"],
        referencedTableName: "paymentDetails",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
