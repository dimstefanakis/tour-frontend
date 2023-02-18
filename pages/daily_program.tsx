import { useState, useEffect } from "react";
import {
  AppShell,
  Button,
  Popover,
  Container,
  Flex,
  Text,
  Tabs,
  TabsProps,
  Stack,
  Modal,
  Input,
} from "@mantine/core";
import { Calendar, DatePicker, TimeInput } from "@mantine/dates";
import DailyProgramTable from "../src/flat/DailyProgramTable";
import ConfirmedGuides from "../src/features/ConfirmedGuides";
import getFormattedDate from "../src/utils/getFormattedDate";
import axios from "axios";

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      unstyled
      styles={(theme) => ({
        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[4]
          }`,
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          cursor: "pointer",
          fontSize: theme.fontSizes.sm,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",

          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&:first-of-type": {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          "&:last-of-type": {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          "&[data-active]": {
            backgroundColor: theme.colors.blue[7],
            borderColor: theme.colors.blue[7],
            color: theme.white,
          },
        },

        tabIcon: {
          marginRight: theme.spacing.xs,
          display: "flex",
          alignItems: "center",
        },

        tabsList: {
          display: "flex",
        },
      })}
      {...props}
    />
  );
}

function DailyProgram() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [availableGuides, setAvailableGuides] = useState([]);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [createdDestination, setCreatedDestination] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);

  async function getDestinations() {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/get_destinations_by_date/`,
      {
        date: getFormattedDate(selectedDate),
      }
    );
    setDestinations(response.data);
  }

  useEffect(() => {
    getDestinations();
  }, [selectedDate]);

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

  const handleChange = (e: any) => {
    setCreatedDestination((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit() {
    const eta = new Date(
      createdDestination.eta_date.getFullYear(),
      createdDestination.eta_date.getMonth(),
      createdDestination.eta_date.getDate(),
      createdDestination.eta_time.getHours(),
      createdDestination.eta_time.getMinutes(),
      createdDestination.eta_time.getSeconds()
    );

    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/create_destination/`,
      {
        eta: eta,
        vessel: createdDestination.vessel,
        location: createdDestination.location,
      }
    );
    setDestinations((prev) => [...prev, response.data]);
    setOpenModal(false);
  }

  function onEtaDateChange(date: any) {
    setCreatedDestination((prev: any) => ({
      ...prev,
      eta_date: date,
    }));
  }

  function onEtaTimeChange(time: any) {
    setCreatedDestination((prev: any) => ({
      ...prev,
      eta_time: time,
    }));
  }

  function onEtdDateChange(date: any) {
    setCreatedDestination((prev: any) => ({
      ...prev,
      etd_date: date,
    }));
  }

  function onEtdTimeChange(time: any) {
    setCreatedDestination((prev: any) => ({
      ...prev,
      etd_time: time,
    }));
  }

  console.log(createdDestination);

  return (
    <Flex
      w="100%"
      justify="center"
      align="center"
      style={{ position: "relative" }}
    >
      <Container style={{ maxWidth: 800, width: "100%" }}>
        <Text fz="xl" fw={700} my="xl">
          Daily Program
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
        <StyledTabs defaultValue="program">
          <Tabs.List my={"xl"}>
            <Tabs.Tab value="program">Program</Tabs.Tab>
            <Tabs.Tab value="guides">Guides</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="program">
            <Stack mt="xl">
              {destinations.map((destination: any, index: number) => (
                <DailyProgramTable
                  key={index}
                  date={selectedDate}
                  availableGuides={availableGuides}
                  destination={destination}
                />
              ))}
              <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                title="Add Destination"
                size="sm"
              >
                <Input
                  required
                  placeholder="Vessel name"
                  name="vessel"
                  onChange={handleChange}
                  style={{ marginTop: "10px" }}
                />
                <Input
                  required
                  placeholder="File name"
                  name="file_name"
                  onChange={handleChange}
                  style={{ marginTop: "10px" }}
                />
                <Input
                  required
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                  style={{ marginTop: "10px" }}
                />
                <Flex style={{ marginTop: "10px" }}>
                  <DatePicker
                    required
                    placeholder="Arrival date"
                    onChange={onEtaDateChange}
                    style={{ marginRight: 5, width: "100%" }}
                  />
                  <TimeInput
                    required
                    placeholder="Arrival time"
                    onChange={onEtaTimeChange}
                    style={{ width: "100%" }}
                  />
                </Flex>
                <Button
                  style={{ marginTop: "10px" }}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Confirm
                </Button>
              </Modal>
              <Button onClick={() => setOpenModal(true)}>
                Add Destination
              </Button>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="guides">
            <ConfirmedGuides date={selectedDate} />
          </Tabs.Panel>
        </StyledTabs>
      </Container>
    </Flex>
  );
}

export default DailyProgram;
