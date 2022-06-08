const express = require("express");
const app = express();

const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const Redis = require("ioredis");

const RedisStore = require("connect-redis")(session);

dotenv.config();
app.use(express.json());

const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_END_POINT,
});

redisClient.on("connect", () => console.log("connected to redis"));
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 30,
      sameSite: true,
    },
  })
);

const users = [
  {
    id: "0f3b1d4b-8086-4658-a2f4-8f0cabeb1fe3",
    email: "test@g.com",
    password: "password",
  },
  {
    id: "d9ffbd80-67e5-4be8-bb98-ededae608e09",
    email: "sample@g.com",
    password: "password",
  },
];

const packageDetails = [
  {
    id: uuidv4(),
    name: "Basic Plan",
    price: 27.36,
    description: "A basic plan with 100 mbps",
  },
  {
    id: uuidv4(),
    name: "Silver Plan",
    price: 57.36,
    description: "A silver plan with 500 mbps",
  },
  {
    id: uuidv4(),
    name: "Premium Plan",
    price: 77.36,
    description: "A premium plan with 1000 mbps",
  },
];

const isAuth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((x) => x.email === email);

  if (user && user.password === password) {
    req.session.userId = user.id;

    res.json({
      id: user.id,
      email: user.email,
      selectedPacakge: req.session.selectedPacakge,
    });
  }

  res.status(404);
};

const getPackageDetails = (req, res) => {
  return res.json(packageDetails);
};

const setSelectedPackage = (req, res) => {
  const { selectedPackageId } = req.body;

  const package = packageDetails.find((x) => x.id === selectedPackageId);

  if (package) {
    req.session.selectedPacakge = package;

    return res.json({ message: "package selected sucessfully" });
  }

  res.status(404);
};

const getSelectedPackage = (req, res) => {
  return res.json(req.session.selectedPacakge);
};

const getUserDetails = (req, res) => {
  const user = users.find((x) => x.id === req.session.userId);
  const selectedPacakge = req.session.selectedPacakge;

  if (selectedPacakge) {
    user.selectedPacakge = selectedPacakge;
  }

  return res.json(user);
};

const logoutUser = (req, res) => {
  const user = users.find((x) => x.id === req.session.userId);
  req.session.destroy((err) => {
    if (err) throw err;

    res.clearCookie("sid");
    delete user.selectedPacakge;
    res.json({ message: "OK" });
  });
};

const changePlan = (req, res) => {
  const user = users.find((x) => x.id === req.session.userId);
  delete user.selectedPacakge;
  req.session.selectedPacakge = null;
  req.session.save();

  return res.json("successfully updated package");
};

const registerUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find((x) => x.email === email);

  if (!user) {
    users.push({
      id: uuidv4(),
      email,
      password,
    });
  }

  return res.json({ message: "user registered successfully" });
};

app.post("/api/user/login", loginUser);
app.get("/api/me", isAuth, getUserDetails);
app.get("/api/packagedetails", isAuth, getPackageDetails);
app.post("/api/onselectedpackage", isAuth, setSelectedPackage);
app.get("/api/getselectedpackage", isAuth, getSelectedPackage);
app.post("/api/changeplan", isAuth, changePlan);
app.post("/api/user/logout", isAuth, logoutUser);
app.post("/api/user/register", registerUser);

app.listen(PORT, () => console.log(`app running on Port: ${PORT}`));
