export const mapperUsers = (users, displayField) => {
  return users?.map((user) =>
    displayField === "name"
      ? { username: user.username, id: user.id }
      : { email: user.email, id: user.id }
  );
};
