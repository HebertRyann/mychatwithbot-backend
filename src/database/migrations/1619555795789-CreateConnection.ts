import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnection1619555795789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'connection',
                columns: [
                    {
                        name: 'socket_id',
                        type: 'varchar',
                    },
                    {
                        name: 'userName',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ]
            })
        );

        // await queryRunner.createForeignKey(
        //     'connection',
        //     new TableForeignKey({
        //         name: 'FK_Connection',
        //         referencedTableName: 'user',
        //         referencedColumnNames: ['userName'],
        //         columnNames: ['userName'],
        //         onDelete: 'SET NULL',
        //         onUpdate: 'SET NULL'
        //     })
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey('connection', 'FK_Connection');
        await queryRunner.dropTable('connection')
    }

}
