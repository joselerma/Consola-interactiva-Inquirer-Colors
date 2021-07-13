const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green}Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green}Listar tarea(s)`,
      },
      {
        value: "3",
        name: `${"3.".green}Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green}Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green}Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green}Borrar tarea(s)`,
      },
      {
        value: "0",
        name: `${"7.".green}Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=========================".green);
  console.log("  Seleccione una opcion ".white);
  console.log("=========================".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const preguntasPausa = [
    {
      type: "input",
      name: "pausa",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(preguntasPausa);
};

const leerInput = async () => {
  const preguntasInput = [
    {
      type: "input",
      name: "desc",
      message: "Añade una descripcion a la tarea:",
      validate(value) {
        if (value.length === 0) return "Por favor ingrese un valor";
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(preguntasInput);
  return desc;
};

const borrarTareas = async (listado = []) => {
  const choices = listado.map((tarea, i) => {
    const idx = `${i + 1}. `.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.push({
    value: "0",
    name: `${choices.length + 1}. `.green + ` Volver`,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const preguntas = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(preguntas);

  return ok;
};

const completarTareas = async (listado = []) => {
  const choices = listado.map((tarea, i) => {
    const idx = `${i + 1}. `.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  borrarTareas,
  confirmar,
  completarTareas,
};
