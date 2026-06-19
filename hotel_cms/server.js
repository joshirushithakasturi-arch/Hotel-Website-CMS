process.on('unhandledRejection', (err) => {
    console.error("Unhandled Rejection:", err);
});

const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

// 🔐 Dummy users
let users = [
    { username: "admin", password: "1234" },
    { username: "user", password: "1234" }
];

// LOGIN API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 💳 Razorpay setup (PUT YOUR KEYS)
;

// CREATE ORDER (✅ FIXED HERE)
app.post("/create-order", async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: "INR"
        };

        const order = await razorpay.orders.create(options);
        res.json(order);

    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(500).json({
            success: false,
            message: "Payment creation failed"
        });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));