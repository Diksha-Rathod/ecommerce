import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class user1669212941263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                        isGenerated: true,
                    },
                    {
                        name: "fullName",
                        type: "varchar",
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ['User','Admin'],
                        enumName: "UserRole"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
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
            true,
        )
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}




