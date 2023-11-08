/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('rewardify_usage', (table) => {
      table.increments('id').primary().index()
      table.string('vendor_id')
      table.specificType('options','jsonb')
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
    .dropTableIfExists('rewardify_usage')
  
};
