const express = require("express");
const { db } = require("./firebase.js");

const app = express();
const port = 8080;

app.use(express.json());

app.listen(port, () => {
  console.log("Server running on port " + port);
});

app.get("/", (req, res) => {
  res.end("Hello World");
});

app.get("/api", async (req, res) => {
  try {
    // We have to get here urlToQr and docId from user
    const urlToQr = 'a';
    const docId = 'eco';

    const ref = db.collection("users").doc(docId);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.end("No such document!");
    } else {
      const link = doc.data()[urlToQr];
      console.log("Redirect to: ", link);

      return res.redirect(link);
    }
  } catch (e) {
    console.log("Catch error: ", e);

    return res.status(404).send({ responseLogs: "Catch error" });
  }
});
