import { useState, useEffect } from "react";
import { Stack, Flex, Table } from "@mantine/core";
import ItemBox from "../../flat/ItemBox";
import getFormattedDate from "../../utils/getFormattedDate";
import axios from "axios";

function ConfirmedGuides({ date }: any) {
  const [guides, setGuides] = useState([]);

  const getGuides = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/guides/confirmed_by_date/`,
      {
        date: getFormattedDate(date),
      }
    );
    setGuides(response.data);
  };

  useEffect(() => {
    getGuides();
  }, [date]);

  return (
    <ItemBox collapsed={false}>
      <Stack>
        {guides.map((guide: any) => {
          return (
            <Table key={guide.id}>
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Guide</th>
                  <th style={{ width: "50%" }}>Final assigment</th>
                </tr>
              </thead>
              <tbody>
                {guide.tours.map((tour: any) => {
                  return (
                    <tr key={tour.id}>
                      <td>{guide.name}</td>
                      <td>{tour.location.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          );
        })}
      </Stack>
    </ItemBox>
  );
}

export default ConfirmedGuides;
