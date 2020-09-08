'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Tasks", "CategoryId", { 
      type: Sequelize.INTEGER,
      references:{
        model:"Categories",
        key: 'id'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "CategoryId", {}) 
  }
};

