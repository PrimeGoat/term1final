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
wait(2000);
myNote.subject = "Devour brains seven times";
wait(2000);
myNote.body;

console.log(myNote);