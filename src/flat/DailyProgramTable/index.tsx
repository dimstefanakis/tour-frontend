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
} from "@mantine/core";
import getFormattedDate from "../../utils/getFormattedDate";
import axios from "axios";

function DailyProgramTable({ date, destination, availableGuides }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [locations, setLocations] = useState([]);
  const [tours, setTours] = useState<any>([]);

  function handleAdd() {
    setTours([...tours, { id: tours.length + 1 }]);
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
                setTours={setTours}
                date={date}
                locations={locations}
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
      <Text fz="md">{destination.name}</Text>
    </ItemBox>
  );
}

function Tour({
  tour,
  setTours,
  date,
  locations,
  availableGuides,
  destination,
}: any) {
  const [selectedLocation, setSelectedLocation] = useState<any>(
    tour?.location?.id
  );
  const [selectedGuide, setSelectedGuide] = useState<any>(tour?.guide?.id);

  function handleLocationChange(value: any) {
    setSelectedLocation(value);
  }

  function handleGuideChange(value: any) {
    setSelectedGuide(value);
  }

  useEffect(() => {
    if (selectedLocation && selectedGuide) {
      // checks if the tour is created by button click or not
      if (!tour?.guide?.id) {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/tours/create/`, {
            location: selectedLocation,
            guide: selectedGuide,
            destination: destination.id,
            date: getFormattedDate(date),
          })
          .then((res) => {
            setTours((tours: any) => {
              return [...tours, res.data];
            });
          });
      } else {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/assign_guide_to_tour/${tour.id}/`,
            {
              location: selectedLocation,
              guide: selectedGuide,
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
  }, [selectedLocation, selectedGuide]);

  return (
    <Flex w="100%" justify="space-between" mt={50}>
      <Select
        w="40%"
        label="Select location"
        placeholder="Location"
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
        w="40%"
        label="Select guide"
        placeholder="Guide"
        onChange={handleGuideChange}
        value={selectedGuide}
        data={availableGuides.map((guide: any) => {
          return {
            label: guide.name,
            value: guide.id,
          };
        })}
      />
    </Flex>
  );
}

export default DailyProgramTable;
