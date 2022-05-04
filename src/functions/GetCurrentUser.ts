export default function () {
  if (localStorage.getItem("userData")) {
    return JSON.parse(localStorage.getItem("userData")!);
  } else {
    return {
      userid: 0,
      username: "",
    };
  }
}
