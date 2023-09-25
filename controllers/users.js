const User = require("../models/users");

exports.getUsers = async (req, res) => {
  try {
    // Realiza una consulta a la base de datos para obtener todos los usuarios
    const users = await User.find();

    res.status(200).json(users); // Responde con la lista de usuarios en formato JSON (código 200)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios." }); // Responde con un error interno del servidor (código 500)
  }
};

exports.createUsers = async (req, res) => {
  const body = req.body;

  // Verifica si ya existe un usuario con el mismo email o userName en la base de datos
  let existUser = await User.findOne({
    $or: [{ email: body.email }, { userName: body.userName }],
  });

  console.log(existUser);

  if (!existUser) {
    // Si no existe un usuario con los mismos datos, procede a crear uno nuevo
    const { email, userName, fullName, isActive, password } = body;

    // Aplica una función hash (sha256) al campo de contraseña para mayor seguridad
    const cryptoPass = require("crypto")
      .createHash("sha256")
      .update(password.toString())
      .digest("hex");

    // Crea una nueva instancia de usuario (usr)
    const usr = new User({
      email: email,
      userName: userName,
      fullName: fullName,
      isActive: isActive,
      password: cryptoPass,
    });

    // Guarda el nuevo usuario en la base de datos
    let user = await usr.save();
    console.log("usuario nuevo");
    console.log(user);

    res.status(201).send(user); // Responde con el usuario creado (código 201)
  } else {
    // Si ya existe un usuario con los mismos datos, responde con un mensaje de conflicto
    res.status(409).send("El usuario ya existe"); // Responde con un conflicto (código 409)
  }
};
