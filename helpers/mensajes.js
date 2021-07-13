require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=========================".green);
    console.log("  Seleccione una opcion ".green);
    console.log("=========================".green);

    console.log(`${"1".green}.Crear tarea`);
    console.log(`${"2".green}.Listar tareas`);
    console.log(`${"3".green}.Listar tareas completadas`);
    console.log(`${"4".green}. Listar tareas pendientes`);
    console.log(`${"5".green}.Completar tareas`);
    console.log(`${"6".green}.Borrar tareas`);
    console.log(`${"0".green}.Salir \n`);
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question("Seleccione una opcion ", (opt) => {
      resolve(opt);
      readLine.close();
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question(`PAUSA presione ${"ENTER".green} para continuar`, () => {
      resolve();
      readLine.close();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
