'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  //   await queryInterface.addColumn("Projects", "UserId", { 
  //     type: Sequelize.INTEGER,
  //     references:{
  //       model:"Users",
  //       key: 'id'
  //     },
  //     onUpdate: "CASCADE",
  //     onDelete: "CASCADE"
  //   });
  // },

  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.removeColumn("Projects", "UserId", {}) 
  }
};

