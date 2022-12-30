import { Paper, Text } from "@mantine/core";
import ItemBox from "../ItemBox";

function GuideItem({
  guide,
  isSelected,
  onClick,
}: {
  guide: any;
  isSelected: boolean;
  onClick: any;
}) {
  function handleClick() {
    onClick(guide);
  }

  return (
    <ItemBox handleClick={handleClick} isSelected={isSelected}>
      <Text fz="md">{guide.name}</Text>
      <Text fz="md">{guide.phone}</Text>
      <Text fz="md" style={{ wordBreak: "break-word" }}>
        {guide.notes}
      </Text>
    </ItemBox>
  );
}

export default GuideItem;
