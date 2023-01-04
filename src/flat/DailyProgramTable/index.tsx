import React from "react";
import ItemBox from "../ItemBox";
import { useState } from "react";
import { Table, Text, Container, Center, Button } from "@mantine/core";

function DailyProgramTable({ tour }: any) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <ItemBox
        key={tour.id}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        CollapsedComponent={
          <Container>
            <Center>
              <Button>Click me</Button>
            </Center>
          </Container>
        }
      >
        <Text fz="md">{tour.name}</Text>
      </ItemBox>
    </>
  );
}

export default DailyProgramTable;
