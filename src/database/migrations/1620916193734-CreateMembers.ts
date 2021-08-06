import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMembers1620916193734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'members',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'userName',
                        type: 'varchar',
                    },
                    {
                        name: 'room',
                        type: 'varchar',
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                    },
                ]
            })
        );       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('members');
    }

}
