/**PORT OR PUERTO */
process.env.PORT = process.env.PORT || 3000;

/**entorno or environment*/

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/mydb";
} else {
  urlDB =
    "mongodb+srv://ploxx95:bAoNc3BLPXMzLEwG@cluster0.it0ca.mongodb.net/test";
}

process.env.URLDB = urlDB;
