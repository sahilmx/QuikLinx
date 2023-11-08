/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('dwan', (table) => {
      table.increments('id').primary().index()
      table.string('option_name')
      table.specificType('sub_option_array','jsonb Array')
      table.timestamp("creation_date").defaultTo(knex.fn.now())
      table.timestamp('updation_date').defaultTo(knex.fn.now())
    
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('dwan')
  
};
