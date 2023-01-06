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
import axios from "axios";

function DailyProgramTable({ destination }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [counter, setCounter] = useState(0);
  const [guides, setGuides] = useState([]);
  const [tours, setTours] = useState([]);

  const handleAdd = () => {
    setCounter(counter + 1);
    console.log(destination);
  };

  const getGuides = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guides/`).then((res) => {
      setGuides(res.data);
    });
  };

  const getTours = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tours/`).then((res) => {
      setTours(res.data);
    });
  };

  useEffect(() => {
    getGuides();
    getTours();
  }, []);

  return (
    <ItemBox
      setCollapsed={setCollapsed}
      collapsed={collapsed}
      CollapsedComponent={
        <Container>
          {Array.from(Array(counter)).map((_, index) => (
            <>
              <Flex w="100%" justify="space-between" mt={50}>
                <Select
                  w="40%"
                  label="Select tour"
                  placeholder="tour"
                  data={tours.map((tour: any)=> {
                    return {
                      label: tour.name,
                      value: tour.id,
                    }
                  })}
                />
                <Select
                  w="40%"
                  label="Select guide"
                  placeholder="guide"
                  data={guides.map((guide: any) => {
                    return {
                      label: guide.name,
                      value: guide.id,
                    };
                  })}
                />
              </Flex>
            </>
          ))}
          <Center my='xl'>
            <Button onClick={handleAdd}>Add tour</Button>
          </Center>
        </Container>
      }
    >
      <Text fz="md">{destination.name}</Text>
    </ItemBox>
  );
}

export default DailyProgramTable;
