const express = require('express');
const app = express()

msg = "Hello world! this is a sample nodejs app"

app.get('/', (req, res) => res.send(msg));

// now run the application and start listening
// on port 3000
app.listen(3000, () => {
    console.log("app running on port 3000...");
})
