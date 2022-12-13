import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
//icons
import { IconPlus } from "@tabler/icons";
//mantine core things
import { Center, Container, Input, Text, Textarea } from "@mantine/core";
import { Modal, Button } from "@mantine/core";
import { IndexInfo } from "typescript";

//dummy data
const userData = [
  {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
    notes: "textarea",
  },
  {
    id: 2,
    name: "John Doe",
    phone: "1234567890",
    notes: "textarea",
  },
  {
    id: 3,
    name: "John Doe",
    phone: "1234567890",
    notes: "textarea",
  },
  {
    id: 4,
    name: "John Doe",
    phone: "1234567890",
    notes: "textarea",
  },
];

export default function Home() {
  //set userData to state
  const [users, setUsers] = useState(userData);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

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

  //get guide from api using axios
  const getGuides = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/guides/");
    setGuides(response.data);

    console.log(guides);
  };

  useEffect(() => {
    getGuides();
  }, []);

  //setName to the value of the input
  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  //setPhone to the value of the input
  // const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhone(e.target.value);
  // };

  //setNotes to the value of the input
  // const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setNotes(e.target.value);
  // };

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
        <Container>
          {guides.map((user) => (
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
