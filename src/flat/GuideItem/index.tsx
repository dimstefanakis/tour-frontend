import { Paper, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";

function GuideItem({
  guide,
  isSelected,
  onClick,
}: {
  guide: any;
  isSelected: boolean;
  onClick: any;
}) {
  const { hovered, ref } = useHover();

  function handleClick() {
    onClick(guide);
  }

  return (
    <Paper
      ref={ref}
      shadow={hovered ? "md" : "sm"}
      radius={hovered ? "md" : "sm"}
      p="lg"
      withBorder
      onClick={handleClick}
      style={{
        minWidth: "50%",
        transition: "box-shadow 200ms ease, border-radius 200ms ease",
        cursor: "pointer",
        backgroundColor: isSelected ? "#e6e6e6" : "white",
      }}
    >
      <Text fz="md">{guide.name}</Text>
      <Text fz="md">{guide.phone}</Text>
      <Text fz="md" style={{ wordBreak: "break-word" }}>
        {guide.notes}
      </Text>
    </Paper>
  );
}

export default GuideItem;
