import { Button, Paper, Text ,Modal} from "@mantine/core";
import ItemBox from "../ItemBox";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "@mantine/core";

function GuideItem({
  guide,
  isSelected,
  onClick,
  setGuides,
  getGuides
}: {
  guide: any;
  isSelected: boolean;
  onClick: any;
  setGuides: any;
  getGuides: any;
}) {
  function handleClick() {
    onClick(guide);
  }

  const [openModal, setOpenModal] = useState(false);

  // delete a guide
  async function handleDelete(e:any) {
    e.stopPropagation();
    await axios
      .delete(`http://localhost:8000/api/v1/guides/${guide.id}/`)
      .then((res) => {
        // get the new list of guides
        axios
          .get("http://localhost:8000/api/v1/guides/")
          .then((res) => {
            setGuides(res.data);
          }
          );
      });
  }

      
  

  // edit
  const handleEditModal = (e:any) => {
    e.stopPropagation();
    setOpenModal(true);
  };



  //edit guide
  const [editGuide, setEditGuide] = useState({
    name: guide.name,
    phone:  guide.phone,
    notes: guide.notes,
  });

  // axios.patchh guide
  async function handleEdit() {
    await axios
      .patch(
        `http://localhost:8000/api/v1/guides/${guide.id}/`,
        editGuide
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      setOpenModal(false);
      getGuides();
  }

  

  return (
    <ItemBox handleClick={handleClick} isSelected={isSelected}>
      <Text fz="md">{guide.name}</Text>
      <Text fz="md">{guide.phone}</Text>
      <Text fz="md" style={{ wordBreak: "break-word" }}>
        {guide.notes}
      </Text>
      <Button onClick={handleDelete} 
      // add margin to the right
      style={{ marginRight: "10px",width:"100px" }}
      >Delete</Button>
      <Button onClick={handleEditModal} style={{width:"100px"}}>Edit</Button>
      {openModal && (
        <Modal
          opened={openModal}
          onClose={() => setOpenModal(false)}
          title="Edit Guide"

        >
          <Text fz="xl" fw={700} my="xl">
            Edit Guide
          </Text>
          <Input
            placeholder="Guide's name"
            defaultValue={guide.name}
            value={editGuide.name}
            onChange={(e) =>
              setEditGuide({ ...editGuide, name: e.target.value })
            }
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <Input
            placeholder="Guide's phone"
            defaultValue={guide.phone}
            value={editGuide.phone}
            onChange={(e) =>
              setEditGuide({ ...editGuide, phone: e.target.value===""?guide.phone:e.target.value })
            }
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <Input
            placeholder="Guide's notes"
            defaultValue={guide.notes}
            value={editGuide.notes}
            onChange={(e) =>
              setEditGuide({ ...editGuide, notes: e.target.value })
            }
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <Button onClick={handleEdit}>Save</Button>
        </Modal>
      )}
    </ItemBox>
  );
}

export default GuideItem;
