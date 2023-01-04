import {
  Paper,
  Collapse,
  Text,
  Button,
  Container,
  Center,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";

function ItemBox({
  handleClick,
  isSelected,
  collapsed,
  setCollapsed,
  CollapsedComponent,
  children,
}: {
  handleClick?: any;
  isSelected?: boolean;
  collapsed?: boolean;
  setCollapsed?: any;
  CollapsedComponent?: JSX.Element;
  children: React.ReactNode;
}) {
  const { hovered, ref } = useHover();

  function onClick() {
    if (handleClick) {
      handleClick();
    }

    if (CollapsedComponent && setCollapsed) {
      setCollapsed(!collapsed);
    }
  }

  return (
    <Paper
      ref={ref}
      shadow={hovered ? "md" : "sm"}
      radius={hovered ? "md" : "sm"}
      p="lg"
      withBorder
      onClick={!collapsed ? onClick : undefined}
      style={{
        minWidth: "50%",
        transition: "box-shadow 200ms ease, border-radius 200ms ease",
        cursor: "pointer",
        backgroundColor: isSelected ? "#e6e6e6" : "white",
      }}
    >
      {children}
      {CollapsedComponent && (
        <Collapse mt="lg" in={!!collapsed}>{CollapsedComponent}</Collapse>
      )}
      {collapsed && CollapsedComponent && (
        <Center style={{ paddingTop: "10px" }}>
          <Button
            onClick={onClick}
            style={{
              minWidth: "100%",
              height: "100%",
              color: "black",
              backgroundColor: "white",
            }}
          >
            ▲
          </Button>
        </Center>
      )}
    </Paper>
  );
}

export default ItemBox;
