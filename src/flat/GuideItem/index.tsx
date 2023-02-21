import { useState, useEffect } from "react";
import { Button, Paper, Text, Modal, Input } from "@mantine/core";
import ItemBox from "../ItemBox";
import axios from "axios";

function GuideItem({
  guide,
  isSelected,
  onClick,
  setGuides,
  getGuides,
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // delete a guide
  async function handleDelete(e: any) {
    e.stopPropagation();
    setDeleteLoading(true);
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/guides/${guide.id}/`)
      .then((res) => {
        // get the new list of guides
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/guides/`).then((res) => {
          setDeleteLoading(false);
          setOpenDeleteModal(false);
          setGuides(res.data);
        });
      });
  }

  // edit
  const handleEditModal = (e: any) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  //edit guide
  const [editGuide, setEditGuide] = useState({
    name: guide.name,
    phone: guide.phone,
    notes: guide.notes,
  });

  // axios.patch guide
  async function handleEdit() {
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/guides/${guide.id}/`,
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
      <Modal opened={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Text fz="md" fw={700} my="xl">
          Are you sure you want to delete this guide?
        </Text>
        <Button
          onClick={() => setOpenDeleteModal(false)}
          style={{ marginRight: "10px", width: "100px" }}
        >
          Cancel
        </Button>
        <Button
          color="red"
          loading={deleteLoading}
          onClick={handleDelete}
          style={{ width: "100px" }}
        >
          Delete
        </Button>
      </Modal>
      <Button
        onClick={() => setOpenDeleteModal(true)}
        // add margin to the right
        style={{ marginRight: "10px", width: "100px" }}
      >
        Delete
      </Button>

      <Button onClick={handleEditModal} style={{ width: "100px" }}>
        Edit
      </Button>
      {openModal && (
        <Modal
          opened={openModal}
          onClose={() => setOpenModal(false)}
          title="Edit Guide"
        >
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
              setEditGuide({
                ...editGuide,
                phone: e.target.value === "" ? guide.phone : e.target.value,
              })
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
