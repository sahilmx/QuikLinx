/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.table('company_profile', table => {
          table.integer('rewardify')
          table.integer('genuinemark')
          table.integer('dwan')
          table.integer('supplybeam')
          table.integer('hybridoceam')
          table.integer('scanandwin')
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.table('company_profile', table => {
        table.dropColumn('rewardify')
        table.dropColumn('genuinemark')
        table.dropColumn('dwan')
        table.dropColumn('supplybeam')
        table.dropColumn('hybridoceam')
        table.dropColumn('scanandwin')
      })

};
