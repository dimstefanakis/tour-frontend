import React from "react";
import { useState } from "react";
import {
  AppShell,
  Button,
  Collapse,
  Container,
  Flex,
  Text,
  Table,
  Stack,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import DailyProgramTable from "../src/flat/DailyProgramTable";

const dummyData = [
  {
    id: 1,
    name: "Viking Sky - Athens",
  },
  {
    id: 2,
    name: "Viking Sea - Volos",
  },
];

function DailyProgram() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarValue, setCalendarValue] = useState<any>(new Date());
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // const handleCalendarOpen = (id: any) => {
  //   setCalendarOpen(!calendarOpen);
  // };

  return (
    <AppShell>

    <Flex
      w="100%"
      justify="center"
      align="center"
      style={{ position: "relative" }}
      >
      <Container style={{ maxWidth: 800, width: "100%" }}>
        <Text fz="xl" fw={700} my="xl">
          Guides List
        </Text>
        <Stack>
          {dummyData.map((guide: any) => (
            <>
              <DailyProgramTable destination={guide} />
            </>
          ))}
        </Stack>
      </Container>
    </Flex>
          </AppShell>
  );
}

export default DailyProgram;
