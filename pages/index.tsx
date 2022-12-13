import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
//icons
import { IconPlus } from "@tabler/icons";
//fuzzysort
import fuzzysort from "fuzzysort";
//mantine core things
import { Center, Container, Input, Text, Textarea } from "@mantine/core";
import { Modal, Button } from "@mantine/core";
import { IndexInfo } from "typescript";



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
    }
    else {
      setSearch(match);
    }
  };

  //get guide from api using axios
  const getGuides = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/guides/");
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
    axios.post("http://localhost:8000/api/v1/guides/create/", newGuide);
    setGuides([...guides, newGuide]);

    console.log(newGuide);

    setOpenModal(false);
  };

  useEffect(() => {
    setSearch(guides);
  }, [guides]);

  return (
    <>
      <Center
        style={{
          width: "50%",
          height: "100%",
          flexDirection: "column",
          paddingTop: "100px",
        }}
      >
        <Container>
          <Text fz="xl" fw={700}>
            Guides List
          </Text>
        </Container>
        {/* search bar */}
        <Container style={{ marginTop: "10px" }}>
          <Input
            placeholder="Search for a guide"
            onChange={handleSearch}
            style={{ width: "100%" }}
          />
        </Container>
        <Container>
          {search.map((user) => (
            <Container
              key={user.phone}
              style={{
                marginTop: "20px",
                border: "1px solid black",
                borderRadius: "9px",
                minWidth: "300px",
                width: "100%",
                padding: "10px",
              }}
            >
              <Text fz="md">{user.name}</Text>
              <Text fz="md">{user.phone}</Text>
              <Text fz="md">{user.notes}</Text>
            </Container>
          ))}
        </Container>
        <Container style={{ marginTop: "10px", cursor: "pointer" }}>
          <IconPlus onClick={handleOpenModal} />
        </Container>
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
      </Center>
    </>
  );
}
