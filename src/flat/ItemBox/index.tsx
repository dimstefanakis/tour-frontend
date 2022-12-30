import { Paper, Collapse, Text } from "@mantine/core";
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
  CollapsedComponent?: any;
  children: React.ReactNode;
}) {
  const { hovered, ref } = useHover();

  function onClick() {
    handleClick();
    setCollapsed(!collapsed);
  }

  return (
    <Paper
      ref={ref}
      shadow={hovered ? "md" : "sm"}
      radius={hovered ? "md" : "sm"}
      p="lg"
      withBorder
      onClick={onClick}
      style={{
        minWidth: "50%",
        transition: "box-shadow 200ms ease, border-radius 200ms ease",
        cursor: "pointer",
        backgroundColor: isSelected ? "#e6e6e6" : "white",
      }}
    >
      {children}
      <Collapse in={!!collapsed}>
        <CollapsedComponent />
      </Collapse>
    </Paper>
  );
}

export default ItemBox;
