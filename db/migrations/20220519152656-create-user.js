module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // чтоб не был пустым
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // чтоб не был пустым
        unique: true, // чтоб не было одинаковых почт
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false, // чтоб не был пустым
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
