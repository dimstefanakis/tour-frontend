import { useState, useEffect } from "react";
import { Calendar } from "@mantine/dates";
import { Indicator, Stack, Button, Menu } from "@mantine/core";
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
              (a: any) => a.day == date.toISOString().slice(0, 10)
            );
            return response?.status == "Y" ? (
              <Indicator
                size={6}
                color={response?.status == "Y" ? "green" : "red"}
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
            <Menu.Item>Available</Menu.Item>
            <Menu.Item color="red">Not Available</Menu.Item>
            <Menu.Item color="red">Couldn&apos;t Reach</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Stack>
    )
  );
}

export default GuideCalendar;
