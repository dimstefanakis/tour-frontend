import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
//icons
import { IconPlus } from "@tabler/icons";
//mantine core things
import { Center, Container, Input, Text, Textarea } from "@mantine/core";
import {Modal,Button} from "@mantine/core"

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

  const [userName, setName] = useState("");
  const [userPhone, setPhone] = useState("");
  const [userNotes, setNotes] = useState("");

  //when user submits the form add the new user to the list
  const handleSubmit = () => {
    if (userName && userPhone && userNotes) {
      const newUser = {
        id: users.length + 1,
        name: userName,
        phone: userPhone,
        notes: userNotes,
      };
      setUsers([...users, newUser]);
      setName("");
      setPhone("");
      setNotes("");
    }
    setOpenModal(false);
    console.log(users);
  };

  //setName to the value of the input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  //setPhone to the value of the input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  //setNotes to the value of the input
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
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
        <Container >
          <Text fz="xl" fw={700}>
            Guides List
          </Text>
        </Container>
        <Container>
          {users.map((user) => (
            <Container
              key={user.id}
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
        <Container style={{marginTop:"10px",cursor:"pointer"}}>

          <IconPlus onClick={handleOpenModal}/>
        </Container>
        <Container>
          <Modal opened={openModal} onClose={() => setOpenModal(false)}>
            <Input placeholder="Guide's name" onChange={handleNameChange} style={{marginTop:"10px"}}/>
            <Input placeholder="Guide's phone number" onChange={handlePhoneChange} style={{marginTop:"10px"}}/>
            <Textarea placeholder="Notes about the guide" onChange={handleNotesChange} style={{marginTop:"10px"}}/>
            <Button onClick={handleSubmit} style={{marginTop:"10px"}}>Submit</Button>
          </Modal>
        </Container>
      </Center>
    </>
  );
}
