import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createListBurger1641156859107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'listBurger',
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
                    name: "title",
                    type: "varchar"
                },
                {
                    name: "price",
                    type: "interger"
                },
                {
                    name: "ingredient",
                    type: "text"
                },
                {
                    name: "type",
                    type: "varchar"
                },
                {
                    name: "avaliation",
                    type: "interger"
                }
                
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('listBurger');
    }

}
