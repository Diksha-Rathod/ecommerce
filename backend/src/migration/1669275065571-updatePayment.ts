import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class updatePayment1669275065571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "paymentDetails",
      new TableColumn({
        name: "orderId",
        type: "int",
      })
    );
    await queryRunner.createForeignKey(
      "paymentDetails",
      new TableForeignKey({
        columnNames: ["orderId"],
        referencedColumnNames: ["id"],
        referencedTableName: "orderDetails",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
