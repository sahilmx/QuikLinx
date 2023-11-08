/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('admins', (table) => {
      table.increments('id').primary().index()

      table
        .integer('adminId')
        .unsigned()
        .references('id')
        .inTable('admins')
        .onDelete('SET NULL')
        .index()

      table.string('name')
      table.string('email')
      table.string('phone')
      table.dateTime('create_date')
      table.boolean('isValid')
      table.string('password')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('persons')
  
};
