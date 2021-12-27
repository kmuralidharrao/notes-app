const chalk = require("chalk");
const notes = require("./notes.js");
const yargs = require("yargs");
//const msg = getNotes();
//console.log(msg);

//console.log(chalk.green.bgRed.bold("Success!"));
//const validator = require("validator");
//console.log(validator.isEmail("abc@gmail.com"));

//console.log(process.argv);

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.removeNote(argv.title),
});

yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

//console.log(yargs.argv);
yargs.parse();
