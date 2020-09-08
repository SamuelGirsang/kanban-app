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
      category : 'Backlog',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      category : 'In progress',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      category : 'Developed',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      category : 'Completed',
      createdAt : new Date(),
      updatedAt : new Date()
    },
  ])
},

down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Categories', null, {});
}
};
