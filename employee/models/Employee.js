import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Employee;