import { useState } from "react";
import { Table, Text, NumberInput } from "@mantine/core";
import ItemBox from "../ItemBox";

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
              return (
                <tr key={tour.id}>
                  <td>{tour.day}</td>
                  <td>{tour.name}</td>
                  <td>{guide.fee}</td>
                  <td>
                    <NumberInput
                      defaultValue={tour.supplementary_fee}
                      parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                      formatter={(value) =>
                        !Number.isNaN(parseFloat(value as any))
                          ? `€ ${value}`.replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          : "€ "
                      }
                    />
                  </td>
                  <td>{tour.sum}</td>
                </tr>
              );
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

export default GuideItemTable;
