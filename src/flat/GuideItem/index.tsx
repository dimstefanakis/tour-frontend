import { Paper, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";

function GuideItem({ user }: { user: any }) {
  const { hovered, ref } = useHover();

  return (
    <Paper
      ref={ref}
      shadow={hovered ? "md" : "sm"}
      radius={hovered ? "md" : "sm"}
      p="lg"
      withBorder
      
      style={{
        minWidth: "50%",
        transition: "box-shadow 200ms ease, border-radius 200ms ease",
        cursor: "pointer",
      }}
    >
      <Text fz="md">{user.name}</Text>
      <Text fz="md">{user.phone}</Text>
      <Text fz="md" style={{wordBreak: 'break-word'}}>{user.notes}</Text>
    </Paper>
  );
}

export default GuideItem;
