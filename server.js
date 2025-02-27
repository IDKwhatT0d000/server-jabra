const app = require('./app');
const port = process.env.PORT || 3000;
const connectDB = require('./models/db');
connectDB();

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
