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
import getFormattedDate from "../src/utils/getFormattedDate";
import axios from "axios";

function DailyProgram() {
  const [destinations, setDestinations] = useState([]);
  const [availableGuides, setAvailableGuides] = useState([]);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  async function getDestinations() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/destinations/`
    );
    setDestinations(response.data);
  }

  useEffect(() => {
    getDestinations();
  }, []);

  const formatDate = (date: any) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return monthNames[monthIndex] + " " + day + ", " + year;
  };

  const getGuides = async () => {
    let date = getFormattedDate(selectedDate);
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/guides/availability_by_day/`,
      {
        day: date,
      }
    );
    setAvailableGuides(response.data);
  };

  useEffect(() => {
    getGuides();
  }, [selectedDate]);

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
        <Popover opened={calendarOpen} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button onClick={() => setCalendarOpen(true)}>
              {formatDate(selectedDate)}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar
              onChange={(value) => {
                setSelectedDate(value);
                setCalendarOpen(false);
              }}
              value={selectedDate}
            />
          </Popover.Dropdown>
        </Popover>
        <Stack mt="xl">
          {destinations.map((destination: any, index: number) => (
            <DailyProgramTable
              key={index}
              date={selectedDate}
              availableGuides={availableGuides}
              destination={destination}
            />
          ))}
        </Stack>
      </Container>
    </Flex>
  );
}

export default DailyProgram;
