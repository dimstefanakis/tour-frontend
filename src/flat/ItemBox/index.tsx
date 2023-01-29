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
        <Collapse mt="lg" in={!!collapsed}>
          {CollapsedComponent}
        </Collapse>
      )}
      {collapsed && CollapsedComponent && (
        <Center style={{ paddingTop: "10px" }}>
          <Button
            onClick={onClick}
            variant="default"
            style={{
              minWidth: "100%",
              color: "black",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-up"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="6 15 12 9 18 15" />
            </svg>
          </Button>
        </Center>
      )}
    </Paper>
  );
}

export default ItemBox;
