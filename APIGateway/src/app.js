const express = require("express");
const { customerRouter } = require("./routes/customer.route");
const adminRouter = require('./routes/admin.route');

const PORT = 4000

const app = express();
app.use(express.json());

app.use("/api/v1/customer", customerRouter)
app.use("/api/v1/admin",adminRouter)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})