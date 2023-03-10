import { useState, useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { toast } from "react-toastify";
import { useAuthStore } from "../src/store/authStore";
import axios from "axios";

export default function AuthenticationTitle() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state: any) => state.setToken);

  async function handleLogin() {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rest-auth/login/`,
        {
          username: username,
          password: password,
          email: "",
        }
      );
      setLoading(false);
      if (res.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${res.data.token}`;
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      } else {
      }
    } catch (e) {
      setLoading(false);
      toast.error("Invalid username or password", {
        position: "top-center",
      });
      // notifications.show({
      //   title: "Error",
      //   message: "Invalid username or password",
      //   color: "red",
      // });
    }
  }

  return (
    <Container size={420} my={40}>
      {/* <Notifications position="top-center" /> */}
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            label="Username"
            placeholder="Your username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group> */}
          <Button
            type="submit"
            loading={loading}
            fullWidth
            mt="xl"
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
