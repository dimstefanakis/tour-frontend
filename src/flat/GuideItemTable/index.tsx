import { useState } from "react";
import { Table, Text } from "@mantine/core";
import ItemBox from "../ItemBox";

function GuideItemTable({ guide }: { guide: any }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ItemBox
      key={guide.id}
      setCollapsed={setCollapsed}
      collapsed={collapsed}
      CollapsedComponent={
        <Table>
          <thead>
            <tr>
              <th>Element position</th>
              <th>Element name</th>
              <th>Symbol</th>
              <th>Atomic mass</th>
            </tr>
          </thead>
          <tbody>
            <tr key={guide.id}>
              <td>{guide.name}</td>
              <td>{guide.name}</td>
              <td>{guide.name}</td>
              <td>{guide.name}</td>
            </tr>
          </tbody>
        </Table>
      }
    >
      <Text fz="md">{guide.name}</Text>
      <Text fz="md">{guide.phone}</Text>
      <Text fz="md" style={{ wordBreak: "break-word" }}>
        {guide.notes}
      </Text>
    </ItemBox>
  );
}

export default GuideItemTable;
