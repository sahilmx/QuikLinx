/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('rewardify', (table) => {
      table.increments('id').primary().index()
      table.string('option_name')
      table.specificType('sub_option_array','jsonb Array')
    
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('rewardify')
  
};
