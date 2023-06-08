import User from "../models/User.js";

// READ

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

//  UPDATE

// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     console.log(
//       "🚀 ~ file: users.js:40 ~ addRemoveFriend ~ req.params:",
//       req.params
//     );
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }

//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );

//     const formattedFriends = friends.map(
//       ({ _id, fristName, lastName, occupation, location, picturePath }) => {
//         return { _id, fristName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     return res.status(404).json({ message: err.message });
//   }
// };

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(
      "🚀 ~ file: users.js:78 ~ addRemoveFriend ~ req.params:",
      req.params
    );
    const user = await User.findById(id);
    console.log("🚀 ~ file: users.js:79 ~ addRemoveFriend ~ user:", user);
    const friend = await User.findById(friendId);
    console.log("🚀 ~ file: users.js:81 ~ addRemoveFriend ~ friend:", friend);

    if (!friend) return;
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    console.log(" ======================");

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
