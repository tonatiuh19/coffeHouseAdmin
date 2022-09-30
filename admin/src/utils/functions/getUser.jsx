const getUser = () => {
  const loggedInUser = localStorage.getItem("08191993");
  console.log(loggedInUser);
  return loggedInUser;
};
export default getUser