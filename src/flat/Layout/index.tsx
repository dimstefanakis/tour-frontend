import NextLink from "next/link";
import { useRouter } from "next/router";
import { AppShell, Navbar, Text, NavLink } from "@mantine/core";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Navbar.Section>
            <Link active={true} label="Home" link="/" />
          </Navbar.Section>
          <Navbar.Section>
            <Link active={false} label="Daily Program" link="/daily_program" />
          </Navbar.Section>
          <Navbar.Section>
            <Link
              active={false}
              label="Guides Per Month"
              link="/guides_per_month"
            />
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
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
      active={router.pathname === link}
      label={label}
      href={`/${link}`}
    />
  );
}

export default Layout;
