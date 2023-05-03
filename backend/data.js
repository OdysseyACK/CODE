import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("ACK"),
      isVendor: false,
      isAdmin: true,
    },
    {
      name: "Celestyn",
      email: "celestyn@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: false,
      isAdmin: true,
    },
    {
      name: "kaichin",
      email: "hokaichin@gmail.com",
      password: bcrypt.hashSync("123"),
      isVendor: false,
      isAdmin: true,
    },
    {
      name: "Alan",
      email: "alan@gmail.com",
      password: bcrypt.hashSync("123"),
      isVendor: false,
      isAdmin: true,
    },
    {
      name: "Muxioo Entertainment",
      email: "muxioo@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Raihan Corp Entertainment",
      email: "raihancorp@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Porterino's",
      email: "porterinos@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Green Parrot Entertainment",
      email: "greenparrotent@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Borcello Food",
      email: "borcello@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Central Restaurant",
      email: "centralrestaurant@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Olivia Wilson Design Studio",
      email: "oliviawilson@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Claudia Wedding Decor",
      email: "claudiawedding@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Claudia Florist",
      email: "claudiaflorist@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Light Studio",
      email: "lightstudio@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Steinfield Photo Studio",
      email: "steinfield@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Studio Shodwe",
      email: "shodwe@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Masked Party",
      email: "maskedparty@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Starlight",
      email: "starlight@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Larana, Inc.",
      email: "laranainc@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Gloriaz Studio",
      email: "gloriaz@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Aldenaire",
      email: "aldenaire@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Sky Garden",
      email: "skygarden@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "il Cielo",
      email: "ilcielo@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "The Vagabond Club",
      email: "thevagabondclub@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "Coastes",
      email: "coastes@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
    {
      name: "The Projector",
      email: "theprojector@email.com",
      password: bcrypt.hashSync("123"),
      isVendor: true,
      isAdmin: false,
    },
  ],
  events: [{}],
  tasks: [{}],
  agenda: [{}],
};

export default data;
