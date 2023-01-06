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


function DailyProgramTable({ tour }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [counter, setCounter] = useState(0);
  const [guides,setGuides] = useState([]);

  const handleAdd = () => {
    setCounter(counter + 1);
    console.log(tour);
  };

  const getGuides = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guides/`).then((res) => {
        setGuides(res.data);
    });
  }

  useEffect(() => {
    getGuides();
    }, []);

  return (
    <>
      <ItemBox
        key={tour.id}
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
                    key="1"
                    data={[
                      {
                        label: "hi",
                        value: "hi",
                      },
                      {
                        label: "hi1",
                        value: "hi1",
                      },
                    ]}
                  />
                  <Select
                    w="40%"
                    label="Select guide"
                    placeholder="guide"
                    key="2"
                    data={
                        guides.map((guide:any) => {
                            return {
                                label: guide.name,
                                value: guide.id
                            }
                        })
                        
                        }
                  />
                </Flex>
              </>
            ))}
            <Center>
              <Button onClick={handleAdd}>Click me</Button>
            </Center>
          </Container>
        }
      >
        <Text fz="md">{tour.name}</Text>
      </ItemBox>
    </>
  );
}

export default DailyProgramTable;
