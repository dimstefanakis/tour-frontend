import { useState, useEffect } from "react";
import { Calendar } from "@mantine/dates";
import { Indicator, Stack, Button, Menu } from "@mantine/core";
import getFormattedDate from "../../utils/getFormattedDate";
import axios from "axios";

function GuideCalendar({ guide }: { guide: any }) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [availability, setAvailability] = useState<any>(null);

  async function getGuideAvailability() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/guides/${guide.id}/availability/`
    );
    setAvailability(response.data);
  }

  async function postGuideAvailability(status: string) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/guides/${guide.id}/create_availability_multiple_dates/`,
      {
        dates: selectedDates.map((date) => getFormattedDate(date)),
        status: status,
      }
    );
    getGuideAvailability();
    setSelectedDates([]);
    // setAvailability(response.data);
  }

  useEffect(() => {
    if (guide) {
      getGuideAvailability();
    }
  }, [guide]);

  return (
    guide?.id && (
      <Stack>
        <Calendar
          renderDay={(date) => {
            // console.log(date);
            const day = date.getDate();
            const response = availability?.find(
              (a: any) => a.day == getFormattedDate(date)
            );
            return response?.status == "Y" ||
              response?.status == "N" ||
              response?.status == "NA" ? (
              <Indicator
                size={6}
                color={
                  response?.status == "Y"
                    ? "green"
                    : response?.status == "N"
                    ? "red"
                    : "yellow"
                }
                offset={8}
              >
                <div>{day}</div>
              </Indicator>
            ) : (
              <div>{day}</div>
            );
          }}
          multiple
          value={selectedDates}
          onChange={setSelectedDates}
        />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              onClick={() => {
                console.log(selectedDates);
              }}
            >
              {selectedDates.length > 0
                ? `Set availability for ${selectedDates.length} days`
                : "Set availability"}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => postGuideAvailability("Y")}>
              Available
            </Menu.Item>
            <Menu.Item onClick={() => postGuideAvailability("N")} color="red">
              Not Available
            </Menu.Item>
            <Menu.Item onClick={() => postGuideAvailability("NA")} color="red">
              Couldn&apos;t Reach
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Stack>
    )
  );
}

export default GuideCalendar;
