const getUser = () => {
  const loggedInUser = localStorage.getItem("08191993");
  return loggedInUser;
};
export default getUser;
