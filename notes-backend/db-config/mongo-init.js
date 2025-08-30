const notesDbUser = process.env.NOTES_DB_USER;
const notesDbPassword = process.env.NOTES_DB_PASSWORD;
const notesDbName = process.env.NOTES_DB_NAME;

console.log("Initializing Notes DB user")

db = db.getSiblingDB(notesDbName);

db.createUser({
    user: notesDbUser,
    pwd: notesDbPassword,
    roles: [
        { role: "readWrite", db: notesDbName },
    ]
});

console.log("User " + notesDbUser + " created for database " + notesDbName);

