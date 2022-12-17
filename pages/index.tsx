import React, { useEffect, useState } from "react";
//mantine core things
import {
  Center,
  Container,
  Input,
  Text,
  Textarea,
  AppShell,
} from "@mantine/core";
import { Modal, Button, Stack, Flex } from "@mantine/core";
import { Calendar } from "@mantine/dates";
//icons
import { IconPlus } from "@tabler/icons";
import GuideItem from "../src/flat/GuideItem";
import GuideCalendar from "../src/features/GuideCalendar";
import fuzzysort from "fuzzysort";
import axios from "axios";

export default function Home() {
  //set userData to state
  const [openModal, setOpenModal] = useState(false);
  const [guides, setGuides] = useState([
    {
      name: "",
      phone: "",
      notes: "",
    },
  ]);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [newGuides, setNewGuides] = useState([
    {
      name: "",
      phone: "",
      notes: "",
    },
  ]);
  const [search, setSearch] = useState(guides);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  //setup a search bar that searches through the guides list and returns the results in a new array called search
  const handleSearch = (e: any) => {
    const results = fuzzysort.go(e.target.value, guides, {
      keys: ["name", "phone", "notes"],
    });
    const match = results.map((result) => result.obj);
    //if the search bar is empty, return the original guides list
    if (e.target.value === "") {
      setSearch(guides);
    } else {
      setSearch(match);
    }
  };

  //get guide from api using axios
  const getGuides = async () => {
    // TODO: replace with .env variable
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/guides/`
    );
    setGuides(response.data);
  };

  useEffect(() => {
    getGuides();
  }, []);

  const handleChange = (e: any) => {
    setNewGuides((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, phone, notes }: any = newGuides;
  const handleSubmit = () => {
    const newGuide = {
      name,
      phone,
      notes,
    };
    // TODO: replace with .env variable
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/guides/create/`, newGuide);
    setGuides([...guides, newGuide]);

    console.log(newGuide);

    setOpenModal(false);
  };

  useEffect(() => {
    setSearch(guides);
  }, [guides]);

  function handleSelectGuide(guide: any) {
    setSelectedGuide(guide);
  }

  return (
    <>
      <AppShell>
        <Flex w="100%" justify="center" align="center">
          <Container style={{ width: "50%" }}>
            <Text fz="xl" fw={700} my="xl">
              Guides List
            </Text>
            {/* search bar */}
            <Input
              placeholder="Search for a guide"
              onChange={handleSearch}
              style={{ width: "100%" }}
            />
            <Stack my="md">
              {search.map((guide) => (
                <GuideItem
                  key={guide.phone}
                  guide={guide}
                  isSelected={guide.name === selectedGuide?.name}
                  onClick={handleSelectGuide}
                ></GuideItem>
              ))}
            </Stack>
            <Button my="md" w="100%" onClick={handleOpenModal}>
              <IconPlus />
            </Button>
            <Container>
              <Modal opened={openModal} onClose={() => setOpenModal(false)}>
                <Input
                  placeholder="Guide's name"
                  name="name"
                  onChange={handleChange}
                  style={{ marginTop: "10px" }}
                />
                <Input
                  placeholder="Guide's phone number"
                  name="phone"
                  onChange={handleChange}
                  style={{ marginTop: "10px" }}
                />
                <Textarea
                  placeholder="Notes about the guide"
                  name="notes"
                  onChange={handleChange}
                  style={{ marginTop: "10px" }}
                />
                <Button onClick={handleSubmit} style={{ marginTop: "10px" }}>
                  Submit
                </Button>
              </Modal>
            </Container>
          </Container>
          <Container>
            <GuideCalendar guide={selectedGuide} />
          </Container>
        </Flex>
      </AppShell>
    </>
  );
}
