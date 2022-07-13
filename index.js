const express = require("express");
const path = require("path");
// const members = require("./Members");

const exphbr = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");
const app = express();

const port = process.env.PORT || 3000; // environment variable -> port || 3000



// Handlebars Middleware
// Setting view/template engine to handlebars , default layout to file called main.handlebars
// app.engine('handlebars', exphbr({ defaultLayout: 'main' }));


app.engine('handlebars', exphbr.engine());
app.set('view engine', 'handlebars');
app.set('views' , './views')

// Body Parser Middleware
app.use(express.json());

// Handle form submissions
// Handle url encoded data form submissions
app.use(express.urlencoded({ extended: false }));



// Homepage Route
app.get('/' , (req , res)=>{
    res.render('index' , {
        title : 'Homepage',
        members
    });
})

// get
// app.get("/" , (req , res)=>{
//     res.send("<h1>Hello World</h1>");   // send a string response
// })

// Load HTML FILE
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public" + "/index.html"));
// });

// Init middleware
// app.use(logger);

// Set a Static Folder
app.use(express.static(path.join(__dirname, "public"))); // use is used when we have to use a middleware

// Members API Routes
app.use("/api/members", require("./routes/api/members"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
