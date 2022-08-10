import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

/**
 * The below components shows the working example of axios for API calls.
 * Also Material UI is integrated for design.
 */
function TestingAPI({ title, desc, url, dates }) {
  return (
    <Card
      style={{
        width: "320px",
        margin: "20px",
        padding: "20px",
        background: "cream",
      }}
    >
      <CardHeader title={title}></CardHeader>
      <CardContent>
        <Typography variant="body1">{desc}</Typography>
      </CardContent>
      <CardActions>
        <img src={url} />
      </CardActions>
      <CardActionArea>
        <p></p>
      </CardActionArea>
    </Card>
  );
}

function Popup({ status, setStatus, postData, dataSubmit, data }) {
  return (
    <>
      <Modal open={status} onClose={setStatus}>
        <Box
          sx={{
            width: 400,
            height: "250px",
            position: "relative",
            top: "200px",
            left: "600px",
            border: "1px solid grey",
            background: "aqua",
            zIndex: "100",
          }}
        >
          <button onClick={postData}>save items</button>
          <input
            placeholder="Title..."
            value={data.name}
            name="name"
            onChange={dataSubmit}
          />
          <br />
          <textarea
            placeholder="description..."
            name="desc"
            value={data.desc}
            onChange={dataSubmit}
          />
          <br />
          <input
            placeholder="image url..."
            name="url"
            value={data.url}
            onChange={dataSubmit}
          />
          <br />
        </Box>
      </Modal>
    </>
  );
}
export default function Posts() {
  // You can delete testingAPI component and start your assignment.
  const [data, setData] = useState({ name: "", desc: "", url: "" });
  const [datas, setDatas] = useState([]);
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpen = () => {
    setStatus(true);
  };
  const handleClose = () => {
    setStatus(false);
  };
  const dataSubmit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getData = () => {
    axios
      .get(`http://localhost:8000/post/data?search=${search}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDatas(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data, "after");
  useEffect(() => {
    getData();
  }, [search]);
  console.log(datas, "mydata");

  const postData = () => {
    axios
      .post(
        "http://localhost:8000/post",
        {
          Title: data.name,
          desc: data.desc,
          image: data.url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setDatas([...datas, { ...res.data }]);
      })
      .catch((err) => {
        console.log(err);
      });
    // setDatas({ ...datas, ...data });
  };
  console.log(data, "dd");
  return (
    <>
      <Box
        sx={{
          width: "80%",
          height: "auto",
          border: "1px solid grey",
          borderRadius: "5px",
          borderShadow: "5px",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "60px",
            border: "1px solid grey",
            borderRadius: "5px",
            borderShadow: "5px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleOpen}
            style={{
              color: "grey",
              fontSize: "40px",
            }}
          >
            +
          </Button>
          {
            <Popup
              status={status}
              setStatus={handleClose}
              postData={postData}
              dataSubmit={dataSubmit}
              data={data}
            />
          }
          <input
            placeholder="search.."
            style={{ width: "200px" }}
            value={search}
            onInput={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Box>
        <Box className="datacontainer">
          {datas &&
            datas.map((item) => {
              return (
                <>
                  <TestingAPI
                    title={item.Title}
                    desc={item.desc}
                    url={item.image}
                  />
                </>
              );
            })}
        </Box>
      </Box>
    </>
  );
}
