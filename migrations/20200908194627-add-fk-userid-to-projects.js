'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  //   await queryInterface.addColumn("Projects", "TaskId", { 
  //     type: Sequelize.INTEGER,
  //     references:{
  //       model:"Tasks",
  //       key: 'id'
  //     },
  //     onUpdate: "CASCADE",
  //     onDelete: "CASCADE"
  //   });
  // },

  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.removeColumn("Projects", "TaskId", {}) 
  }
};

