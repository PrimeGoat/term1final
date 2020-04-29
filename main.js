let notes = [];

// Note entry object format
const note = function(subject = "", body = "") {
	let now = unixtime();
	return {
		index: null,
		subj: subject,
		get subject() {
			this.atime = unixtime();
			return this.subj;
		},
		set subject(value) {
			now = unixtime();
			this.atime = now;
			this.mtime = now;
			this.subj = value;
		},
		bod: body,
		get body() {
			this.atime = unixtime();
			return this.bod;
		},
		set body(value) {
			now = unixtime();
			this.atime = now;
			this.mtime = now;
			this.bod = value;
		},
		atime: now,
		ctime: now,
		mtime: now,
	};
}

// Copies a note object
const copyNote = function(input) {
	let newNote = note(input.subject, input.body);
	console.log("Copied: " + newNote);
	return newNote;
}

// Adds a note
const addNote = function(note) {
	let newNote = copyNote(note);
	newNote.index = notes.length;
	notes.push(newNote);
}

// Edits an existing note
const editNote = function(index, inputNote) {
	if(typeof(notes[index]) == "undefined") {
		return false;
	}
	note.index = index;
	notes[index] = copyNote(inputNote);
	return true;
}

// Delete an existing note: Returns successfulness of operation
const delNote = function(index) {
	if(typeof(notes[index]) == "undefined") {
		return false;
	}

	delete notes[index];
	let allNotes = [];
	for(let note of notes) {
		if(note != undefined) {
			allNotes.push(note);
		}
	}

	// Reindex list
	notes.length = 0;
	let i = 0;
	for(let note of allNotes) {
		note.index = i++;
		notes.push(note);
	}
	return true;
}

const submitNote = function(args) {
	//console.log(args);
	let subject = document.querySelector("#addSubject").value;
	let body = document.querySelector("#addBody").value;

	addNote(note(subject, body));
	printNotes();
}
document.querySelector("#addSubmit").addEventListener("click", submitNote);

// Print notes
const printNotes = function() {
	clearNotes();

	let parent = document.querySelector(".notes");
	for(let i = 0; i < notes.length; i++) {
		const div = document.createElement('div');
		div.innerText = "" + i + ": " + notes[i].subject + '\n' + notes[i].body;
		div.classList.add("note");
		parent.appendChild(div);
	}
}

// Clears the DOM of notes.
const clearNotes = function() {
	const list = document.querySelector('.notes');
	while(list.hasChildNodes()) {
		list.firstChild.remove();
	}
}

function unixtime() {
	return Math.round(Date.now() / 1000)
}

function wait(ms) {
	let i = 0;
	let goal = Date.now() + ms;
	while(Date.now() < goal) {
		i++;
	}
	return i;
}


//console.log(wait(1000));


let myNote = note("Token", "Eh braskaska, chto za marana i rlinomaranabraskaskamarana tokendomelakalema");
wait(750);
myNote.subject = "Devour brains seven times";
wait(750);
myNote.body;

console.log(myNote);

addNote(myNote);

wait(750);

myNote.subject = "Rechange";

addNote(myNote);

console.log(notes);

printNotes();