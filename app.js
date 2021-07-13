const colors = require("colors");
const { mostrarMenu } = require("./helpers/mensajes");
const {
  inquirerMenu,
  pausa,
  leerInput,
  borrarTareas,
  confirmar,
  completarTareas,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

console.clear();

const main = async () => {
  let opt = "";

  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput();
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();

        break;
      case "3":
        tareas.listarCompletoPendiente(true);
        break;
      case "4":
        tareas.listarCompletoPendiente(false);
        break;
      case "5":
        const ids = await completarTareas(tareas.listadoArr);
        tareas.completarTareas(ids);
        break;
      case "6":
        const id = await borrarTareas(tareas.listadoArr);

        if (id !== "0") {
          const ok = await confirmar("¿Desea borrar el campo?");

          if (ok) {
            tareas.borrarTarea(id);
          }
        }
        break;
    }
    guardarDB(tareas.listadoArr);
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
