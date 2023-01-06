import { useState, useEffect } from "react";
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
import axios from "axios";



function DailyProgram() {
  const [tours, setTours] = useState([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarValue, setCalendarValue] = useState<any>(new Date());
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // const handleCalendarOpen = (id: any) => {
  //   setCalendarOpen(!calendarOpen);
  // };

  async function getTours() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tours/`
    );
    console.log(response.data);
    setTours(response.data);
  }

  useEffect(() => {
    getTours();
  }, []);

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
            {tours.map((tour: any) => (
              <>
                <DailyProgramTable tour={tour} />
              </>
            ))}
          </Stack>
        </Container>
      </Flex>
    </AppShell>
  );
}

export default DailyProgram;
