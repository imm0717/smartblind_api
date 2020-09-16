import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUserTable1600231584619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
