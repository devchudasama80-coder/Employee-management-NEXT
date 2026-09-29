import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const User = sequelize.define(
  "User",
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twoFactorBackupCodes: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default User;