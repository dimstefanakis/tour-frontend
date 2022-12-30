import { useState, useEffect } from "react";
import { AppShell, Flex, Container, Text, Stack } from "@mantine/core";
import ItemBox from "../src/flat/ItemBox";
import axios from "axios";

function GuidesPerMonth() {
  const [guides, setGuides] = useState([]);

  //get guide from api using axios
  const getGuides = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/guides/`
    );
    setGuides(response.data);
  };

  useEffect(() => {
    getGuides();
  }, []);

  return (
    <AppShell>
      <Flex
        w="100%"
        justify="center"
        align="center"
        style={{ position: "relative" }}
      >
        <Container style={{maxWidth: 800, width: '100%'}}>
          <Text fz="xl" fw={700} my="xl">
            Guides List
          </Text>
          <Stack>
            {guides.map((guide: any) => (
              <ItemBox key={guide.id}>
                <Text fz="md">{guide.name}</Text>
                <Text fz="md">{guide.phone}</Text>
                <Text fz="md" style={{ wordBreak: "break-word" }}>
                  {guide.notes}
                </Text>
              </ItemBox>
            ))}
          </Stack>
        </Container>
      </Flex>
    </AppShell>
  );
}

export default GuidesPerMonth;
