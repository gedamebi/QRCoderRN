import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

export const sqliteDB = () => {
  
  const openDatabase = async () => {
    let db = null;
    if(Platform.OS !== 'web') db = await SQLite.openDatabaseSync("app.db")
    return db;
  };

  const initSQLiteDB = async () => {
    const db = await openDatabase();
    const sqlTablaSettings = `CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, darkMode INTEGER);`;
    const res = await db.execAsync(sqlTablaSettings)

    // Verificar si ya tiene datos por defecto la tabla settings
    const sqlCount = `SELECT COUNT(*) FROM settings;`;
    const countResult = await db.getFirstAsync(sqlCount);
    if (countResult['COUNT(*)'] === 0) {
      // Si la tabla está vacía, insertar el valor por defecto
      const sqlInsert = `INSERT INTO settings (darkMode) VALUES (?);`;
      const args = [0];
      const resInsert = await db.runAsync(sqlInsert, args);
      return resInsert;
    }
    return res;
  };

  const saveTheme = async (mode) => {
    const db = await openDatabase();
    const sqlDelete = `DELETE FROM settings;`;
    const resDelete = await db.execAsync(sqlDelete);
    const sqlInsert = `INSERT INTO settings (darkMode) VALUES (?);`;
    const args = [mode ? 1 : 0];
    const resInsert = await db.runAsync(sqlInsert, args);
    return resInsert;
  };

  const getTheme = async () => {
    const db = await  openDatabase();
    const sql = `SELECT * FROM settings`
    const firstRow = await db.getFirstAsync(sql);
    return firstRow;
  };

  return {
    initSQLiteDB,
    saveTheme,
    getTheme,
  };
};
