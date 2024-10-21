const db = {
  users: [],
};

export const getUsers = () => db.users;

export const getUserById = (id) => db.users.find((user) => user.id === id);

export const addUser = (user) => {
  db.users.push(user);
};

export const updateUser = (id, updatedUser) => {
  const index = db.users.findIndex((user) => user.id === id);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updatedUser };
  }
};

export const deleteUser = (id) => {
  db.users = db.users.filter((user) => user.id !== id);
};
