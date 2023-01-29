import { useState } from "react";
import { Select } from "@mantine/core";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthSelector = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = [
    new Date().getFullYear().toString(),
    (new Date().getFullYear() - 1).toString(),
    (new Date().getFullYear() - 2).toString(),
  ];

  const handleChange = (value: any) => {
    const [month, year] = value.split("-");
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const options = years
    .map((year) => {
      let availableMonths = [...months].reverse().map((month) => {
        // dont include months in the future
        if (new Date(`${month} 1, ${year}`).getTime() > Date.now()) {
          return null as any;
        }
        return {
          label: `${month} ${year}`,
          value: `${month}-${year}`,
        };
      });
      availableMonths = availableMonths.filter((date) => date !== null);
      return availableMonths;
    })
    .flat();

  return (
    <Select
      label=""
      value={`${selectedMonth}-${selectedYear}`}
      onChange={handleChange}
      data={options}
    />
  );
};
export default MonthSelector;
