/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('industry', (table) => {
      table.increments('id').primary().index()
      table.string('i_name')
      table.specificType('i_users','varchar Array')
      table.timestamp("created_at").defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('industry')
  
};
