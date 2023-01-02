import React from "react";
import ItemBox from "../ItemBox";
import { useState } from "react";
import { Table, Text, Container, Center, Button } from "@mantine/core";

function DailyProgramTable({ destination }: any) {
  const [collapsed, setCollapsed] = useState(false);

  
  return (
    <>
      <ItemBox
        key={destination.id}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        CollapsedComponent={
          // button that when clicked the the collapse doesnt close
            <Container> 
                <Center>
                    <Button>Click me</Button>
                </Center>
            </Container>
            
          
          
        }
      >
        <Text fz="md">{destination.name}</Text>
      </ItemBox>
    </>
  );
}

export default DailyProgramTable;
