import React, { useEffect } from "react";
import ItemBox from "../ItemBox";
import { useState } from "react";
import {
  Table,
  Text,
  Container,
  Center,
  Button,
  Select,
  Flex,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { IconTrash, IconEdit } from "@tabler/icons";
import getFormattedDate from "../../utils/getFormattedDate";
import axios from "axios";

function DailyProgramTable({ date, destination, availableGuides }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [locations, setLocations] = useState([]);
  const [tours, setTours] = useState<any>([]);

  function handleAdd() {
    setTours([...tours, { id: tours.length + 1 }]);
  }

  function handleEdit(e: React.MouseEvent, destination: any) {
    e.stopPropagation();
  }

  const getLocations = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/locations/`).then((res) => {
      setLocations(res.data);
    });
  };

  const getTours = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/tours_by_destination_and_day/${destination.id}/`,
        {
          day: getFormattedDate(date),
        }
      )
      .then((res) => {
        setTours(res.data);
      });
  };

  useEffect(() => {
    getLocations();
    getTours();
  }, [date]);

  return (
    <ItemBox
      setCollapsed={setCollapsed}
      collapsed={collapsed}
      CollapsedComponent={
        <Container>
          {tours.map((tour: any) => {
            return (
              <Tour
                key={tour.id}
                tour={tour}
                tours={tours}
                setTours={setTours}
                getTours={getTours}
                date={date}
                locations={destination.location.tour_locations}
                availableGuides={availableGuides}
                destination={destination}
              />
            );
          })}
          <Center my="xl">
            <Button onClick={handleAdd}>Add tour</Button>
          </Center>
        </Container>
      }
    >
      <Flex>
        <Text fz="md">{destination.name}</Text>
        <ActionIcon
          onClick={(e) => handleEdit(e, destination)}
          variant="default"
          ml="auto"
        >
          <IconEdit size="1rem"/>
        </ActionIcon>
      </Flex>
    </ItemBox>
  );
}

function Tour({
  tour,
  tours,
  setTours,
  getTours,
  date,
  locations,
  // availableGuides,
  destination,
}: any) {
  const [guidesLoading, setGuidesLoading] = useState(false);
  const [availableGuides, setAvailableGuides] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(
    tour?.tour_location?.id
  );
  const [selectedGuide, setSelectedGuide] = useState<any>(tour?.guide?.id);
  const [selectedTourTime, setSelectedTourTime] = useState<any>(
    tour?.tour_time
  );

  function handleLocationChange(value: any) {
    setSelectedLocation(value);
  }

  function handleGuideChange(value: any) {
    setSelectedGuide(value);
  }

  function handleTourTimeChange(value: any) {
    setSelectedTourTime(value);
  }

  const getGuides = async () => {
    let selectedDate = getFormattedDate(date);
    setGuidesLoading(true);
    let body;
    if (tour.guide) {
      body = {
        day: selectedDate,
        location: selectedLocation,
        tour: tour?.id,
      };
    } else {
      body = {
        day: selectedDate,
        location: selectedLocation,
      };
    }
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/guides/availability_for_location/`,
      body
    );
    setGuidesLoading(false);
    setAvailableGuides(response.data);
  };

  function deleteTour() {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/tours/delete/${tour.id}/`)
      .then(() => {
        setTours((tours: any) => {
          return tours.filter((t: any) => t.id !== tour.id);
        });
      });
  }

  useEffect(() => {
    if (selectedLocation && selectedGuide && selectedTourTime) {
      // checks if the tour is created by button click or not
      if (!tour?.guide?.id) {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/tours/create/`, {
            location: selectedLocation,
            guide: selectedGuide,
            destination: destination.id,
            tour_time: selectedTourTime,
            date: getFormattedDate(date),
          })
          .then((res) => {
            getTours();
          });
      } else {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/assign_guide_to_tour/${tour.id}/`,
            {
              location: selectedLocation,
              guide: selectedGuide,
              tour_time: selectedTourTime,
            }
          )
          .then((res) => {
            // find already existing tour and replace it with new one
            setTours((tours: any) => {
              return tours.map((t: any) => {
                if (t.id === tour.id) {
                  return res.data;
                }
                return t;
              });
            });
          });
      }
    }
  }, [selectedLocation, selectedGuide, selectedTourTime]);

  const toursForGuide = tours.filter((t: any) => t.guide?.id === selectedGuide);

  const availableTimesForGuide = ["AM", "PM"].filter(
    (time: any) => !toursForGuide.find((t: any) => t.tour_time === time)
  );

  return (
    <Flex w="100%" justify="space-between" align="flex-end" mt={50}>
      <Select
        w="25%"
        label="Select tour"
        placeholder="Tour"
        onChange={handleLocationChange}
        value={selectedLocation}
        data={locations.map((location: any) => {
          return {
            label: location.name,
            value: location.id,
          };
        })}
      />
      <Select
        w="25%"
        label="Select guide"
        placeholder="Guide"
        onChange={handleGuideChange}
        value={selectedGuide}
        onDropdownOpen={getGuides}
        disabled={!selectedLocation}
        rightSection={guidesLoading ? <Loader size={16} /> : null}
        data={
          tour.guide && availableGuides.length == 0
            ? [
                {
                  label: tour.guide.name,
                  value: tour.guide.id,
                },
              ]
            : availableGuides.map((guide: any) => {
                return {
                  label: guide.name,
                  value: guide.id,
                };
              })
        }
      />
      <Select
        w="25%"
        label="Select time"
        placeholder="AM/PM"
        disabled={!selectedLocation || !selectedGuide}
        onChange={handleTourTimeChange}
        value={selectedTourTime}
        data={[
          {
            label: "AM",
            value: "AM",
            disabled: !availableTimesForGuide.includes("AM"),
          },
          {
            label: "PM",
            value: "PM",
            disabled: !availableTimesForGuide.includes("PM"),
          },
        ]}
      />
      <ActionIcon disabled={!tour.guide} variant="default" onClick={deleteTour}>
        <IconTrash />
      </ActionIcon>
    </Flex>
  );
}

export default DailyProgramTable;
