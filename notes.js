const fs = require("fs");
const chalk = require("chalk");

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.blue.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const addNote = (title, body) => {
  //console.log("Title: ", title, "Body: ", body);
  let notes = loadNotes();
  //const duplicateNotes = notes.filter((note) => note.title === title);
  //updated code for finding the note
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added successfully"));
  } else {
    console.log(chalk.red.inverse("Not not added, Note title taken!"));
  }
};
const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync("notes.json", data);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const data = dataBuffer.toString();
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};
const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (newNotes.length === notes.length)
    console.log(chalk.red.inverse("Note not found!"));
  else {
    saveNotes(newNotes);
    console.log(chalk.green.inverse("Note removed!"));
  }
};
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse("Your notes:=>"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

module.exports = { readNote, addNote, removeNote, listNotes };
