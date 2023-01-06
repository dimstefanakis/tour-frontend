import { useState, useEffect } from "react";
import {
  AppShell,
  Button,
  Popover,
  Container,
  Flex,
  Text,
  Table,
  Stack,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import DailyProgramTable from "../src/flat/DailyProgramTable";
import axios from "axios";

function DailyProgram() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // const handleCalendarOpen = (id: any) => {
  //   setCalendarOpen(!calendarOpen);
  // };

  async function getDestinations() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/destinations/`
    );
    console.log(response.data);
    setDestinations(response.data);
  }

  useEffect(() => {
    getDestinations();
  }, []);

  return (
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
        <Popover position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button>Change Date</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar />
          </Popover.Dropdown>
        </Popover>
        <Stack>
          {destinations.map((destination: any, index: number) => (
            <>
              <DailyProgramTable key={index} destination={destination} />
            </>
          ))}
        </Stack>
      </Container>
    </Flex>
  );
}

export default DailyProgram;
