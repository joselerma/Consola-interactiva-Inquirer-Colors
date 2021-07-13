const Tarea = require("./tarea");
require("colors");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }
  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    const listado = this.listadoArr;
    console.log();
    listado.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completa".green : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarCompletoPendiente(completa = true) {
    const listado = this.listadoArr;
    let contador = 0;
    console.log();
    listado.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      if (completa) {
        if (completadoEn) {
          console.log(
            `${++contador}. `.green + desc + " :: " + `${completadoEn}`.green
          );
        }
      } else {
        if (!completadoEn) {
          console.log(
            `${++contador}. `.green + desc + " :: " + "Pendiente".red
          );
        }
      }
    });
  }
  completarTareas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
