import { Box, Avatar, Modal } from "@mui/material";
import React, { useState } from "react";
export default function Popup() {
  //   const [state, setState] = useState(false);
  //   const handleOpen = () => setState(true);
  //   const handleClose = () => setState(false);
  const [data, setData] = useState({ name: "", desc: "", url: "" });
  const dataSubmit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box
        sx={{
          width: 400,
          height: "250px",
          position: "relative",
          top: "200px",
          left: "600px",
          border: "1px solid grey",
          background: "grey",
        }}
      >
        <button>save items</button>
        <input
          placeholder="name"
          value={data.name}
          name="name"
          onChange={dataSubmit}
        />
        <br />
        <textarea
          placeholder="description"
          name="desc"
          value={data.desc}
          onChange={dataSubmit}
        />
        <br />
        <input
          placeholder="url"
          name="url"
          value={data.url}
          onChange={dataSubmit}
        />
        <br />
      </Box>
    </>
  );
}
