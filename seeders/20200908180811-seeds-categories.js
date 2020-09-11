'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Categories', [
    {
      category_name : 'Backlog',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      category_name : 'In progress',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      category_name : 'Developed',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      category_name : 'Completed',
      createdAt : new Date(),
      updatedAt : new Date()
    },
  ])
},

down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Categories', null, {});
}
};
