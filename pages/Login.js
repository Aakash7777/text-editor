import Button from "@material-tailwind/react/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userService } from "../services/user.service";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  useEffect(() => {
    if (userService.user) {
      router.push("/");
    }
  }, []);

  const logIn = (event) => {
    event.preventDefault();
    if (username && password) {
      const params = {
        username,
        password,
      };

      userService.login(params).then((res) => {
        router.push("/");
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex items-center text-gray-700 my-4 text-5xl">
        Text Editor!
      </div>
      <form className="flex flex-col w-64" onSubmit={logIn}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="outline-none w-full my-4 p-4 border rounded-lg"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="outline-none w-full my-4 p-4 border rounded-lg"
          placeholder="Password"
        />
        <Button
          type="submit"
          className="w-44 mt-10"
          color="blue"
          buttonType="filled"
          ripple="light"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
