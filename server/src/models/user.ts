import { DataTypes, Sequelize } from "sequelize";

export const defineUserModel = (sequelize: Sequelize) => {
	const User = sequelize.define("users", {
		email: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		firstName: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		lastName: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		description: {
            type: DataTypes.TEXT
		},
	});

	return User;
};