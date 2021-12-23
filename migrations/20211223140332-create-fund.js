'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Funds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      goal: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        reference: {
            model: "user",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
        },
      paymentId: {
        type: Sequelize.INTEGER,
        reference: {
                model: "payment",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Funds');
  }
};