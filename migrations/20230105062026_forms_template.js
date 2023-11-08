/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('form_template', (table) => {
      table.increments('id').primary().index()
      table.string('template_name')
      table.integer('industry')
      table.integer('form_type')
      table.specificType('template_json','json Array')
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
    .dropTableIfExists('form_template')
  
};
