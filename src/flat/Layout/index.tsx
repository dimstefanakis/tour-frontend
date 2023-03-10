import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AppShell, Navbar, Text, NavLink, Image } from "@mantine/core";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  if (router.pathname === "/signin") {
    return <>{children}</>;
  }
  return (
    <AppShell
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Image src="/logo.png" alt="logo" mb={5}></Image>
          <Navbar.Section>
            <Link active={true} label="Home" link="" />
          </Navbar.Section>
          <Navbar.Section>
            <Link active={false} label="Daily Program" link="daily_program" />
          </Navbar.Section>
          <Navbar.Section>
            <Link
              active={false}
              label="Guides Per Month"
              link="guides_per_month"
            />
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const token = useAuthStore((state: any) => state.token);
  const setToken = useAuthStore((state: any) => state.setToken);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
    if (!localToken) {
      router.push("/signin");
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
      setIsAuth(true);
      router.push("/");
    }
  }, [token]);

  if (router.pathname === "/signin") {
    return <>{children}</>;
  } else if (isAuth) {
    return <Layout>{children}</Layout>;
  } else {
    return <></>;
  }
}

function Link({
  active,
  label,
  link,
}: {
  active: boolean;
  label: any;
  link: string;
}) {
  const router = useRouter();

  return (
    <NavLink
      component={NextLink}
      active={router.pathname === `/${link}`}
      label={label}
      href={`/${link}`}
    />
  );
}

export default AuthWrapper;
