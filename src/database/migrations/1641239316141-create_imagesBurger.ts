import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagesBurger1641239316141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'imagesBurger',
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "path",
                    type: "varchar"
                },
                {
                    name: "burger_id",
                    type: "interger"
                }
                
            ],
            foreignKeys: [
                {
                    name: "burgerRelationalImage",
                    columnNames: ["burger_id"],
                    referencedTableName: "listBurger",
                    referencedColumnNames: ["id"], 
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('imagesBurger');
    }

}
