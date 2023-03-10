import { useState } from "react";
import { Table, Text, NumberInput } from "@mantine/core";
import ItemBox from "../ItemBox";
import axios from "axios";

function GuideItemTable({ guide }: { guide: any }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ItemBox
      key={guide.id}
      setCollapsed={setCollapsed}
      collapsed={collapsed}
      CollapsedComponent={
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Tour</th>
              <th>Fee/tour</th>
              <th>Extra sup</th>
              <th>Total sum</th>
            </tr>
          </thead>
          <tbody>
            {guide.tours.map((tour: any) => {
              console.log(tour);
              return <TableItem key={tour.id} tour={tour} guide={guide} />;
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>{guide.total}</th>
            </tr>
          </tfoot>
        </Table>
      }
    >
      <Text fz="md">{guide.name}</Text>
      <Text fz="md">{guide.phone}</Text>
      <Text fz="md" style={{ wordBreak: "break-word" }}>
        {guide.notes}
      </Text>
    </ItemBox>
  );
}

function TableItem({ tour, guide }: { tour: any; guide: any }) {
  function onChangeSupplementaryFee(value: number, tourId: string) {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/tours/update/${tourId}/`, {
        supplementary_fee: value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onChangeFee(value: number, tourId: string) {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/tours/update/${tourId}/`, {
        fee: value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <tr key={tour.id}>
      <td>{tour.day}</td>
      <td>{tour.name}</td>
      <td>
        <NumberInput
          min={0}
          size="xs"
          hideControls
          onChange={(value) => onChangeFee(value || 0, tour.id)}
          defaultValue={parseFloat(tour.fee as string) || 0}
          // parser={(value: any) => value.replace(/\€\s?|(,*)/g, "")}
          // formatter={(value) =>
          //   !Number.isNaN(parseFloat(value as any))
          //     ? `€ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          //     : "€ "
          // }
        />
      </td>
      <td>
        <NumberInput
          min={0}
          size="xs"
          hideControls
          onChange={(value) => onChangeSupplementaryFee(value || 0, tour.id)}
          defaultValue={parseFloat(tour.supplementary_fee as string) || 0}
          // parser={(value: any) => value.replace(/\€\s?|(,*)/g, "")}
          // formatter={(value) =>
          //   !Number.isNaN(parseFloat(value as any))
          //     ? `€ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          //     : "€ "
          // }
        />
      </td>
      <td>{tour.sum}</td>
    </tr>
  );
}

export default GuideItemTable;
