const { User, Nft, Collection, Purchase } = require("../db");
const { superUser } = require("../jsondata/superUserData.json");

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ error: err.message });
  }
};

const signInWithGoogle = async (req, res) => {
  try {
    const userData = req.body;
    const [newUser, created] = await User.findOrCreate({
      where: { id: userData.id },
      defaults: userData,
    });
    if (!created) {
      newUser.set(userData);
      await newUser.save();
    }
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [{ model: Nft }, { model: Collection }, { model: Purchase }],
    });
    if (allUsers.length === 0) {
      throw new Error(`No users found on database`);
    } else {
      return res.status(200).json(allUsers);
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const foundUser = await User.findByPk(id);
    if (foundUser) {
      foundUser.set(dataToUpdate);
      await foundUser.save();
      return res.status(200).send(foundUser);
    } else {
      throw new Error(`No user with id ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({error: err.message});
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findByPk(id, {
      include: [
        {
          model: Nft,
        },
        {
          model: Collection,
        },
        {
          model: Purchase,
        },
      ],
    });
    if (foundUser) {
      return res.status(200).json(foundUser);
    } else {
      throw new Error(`No user found with id: ${id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByPk(id);
    if (deletedUser) {
      await User.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send(`${deletedUser.name}  successfully deleted`);
    } else {
      throw new Error(`no NFT found with id: ${id}`);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};

const restoreDeletedUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.restore({
      where: {
        id: id,
      },
    });

    const restoredUser = await User.findByPk(id);

    if (restoredUser) {
      return res.status(200).json({
        user: restoredUser,
        message: `${restoredUser.name} successfully restored`,
      });
    } else {
      throw new Error(`No nft found with id ${id}`);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ err: err.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { dni } = req.body;
    const user = await User.findByPk(id);
    if (user.type === "Basic") {
      if (user) {
        user.set({
          dni: dni,
          type: "Verified",
        });
        await user.save();
        return res.status(200).json({
          user: user,
          dni: user.dni,
          type: user.type,
        });
      } else {
        throw new Error(`No user found with id ${id}`);
      }
    } else {
      res.status(200).send("User already verified");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const verifiedToAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user.type === "Verified") {
      if (user) {
        user.set({
          type: "Admin",
        });
        await user.save();
        return res.status(200).json({
          user: user,
          type: user.type,
        });
      } else {
        throw new Error(`No user found with id ${id}`);
      }
    } else if (user.type === "Basic") {
      throw new Error(`User not verified`);
    } else {
      res.status(200).send(`User is already an admin`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const adminToVerified = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user.type === "Admin") {
      if (user) {
        user.set({
          type: "Verified",
        });
        await user.save();
        return res.status(200).json({
          user: user,
          type: user.type,
        });
      } else {
        throw new Error(`No user found with id ${id}`);
      }
    } else if (user.type === "Verified") {
      throw new Error(`User not admin`);
    } else {
      res.status(200).send(`User is already an verified`);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
/*
 * Super user data
 */
const createSuperUser = async () => {
  try {
    let response = await User.findOne({
      where: {
        id: superUser.id,
      },
    });
    if (!response) {
      response = await User.create({
        id: superUser.id,
        name: superUser.name,
        last_name: superUser.last_name,
        email: superUser.email,
        type: superUser.type,
        profile_pic: superUser.profile_pic,
      });
    }
    console.log("Super user created");
    return response;
  } catch (error) {
    console.error("User error message", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  signInWithGoogle,
  updateUser,
  restoreDeletedUser,
  verifyUser,
  createSuperUser,
  verifiedToAdmin,
  adminToVerified,
};
