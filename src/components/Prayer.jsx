import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Prayer({ name, time, image }) {
  return (
    <Card
      style={{ boxShadow: "var(--prayer-shadow)"}}
      sx={{
        backgroundColor:"var(--prayer-bg)",
        minWidth: {
          xs: 350,
          sm: 350,
          md: "258px",
          lg: "258px",
          xl: "258px",
        },
        minHeight: {
          xs: "385px",
          sm: "385px",
          md: "258px",
          lg: "258px",
          xl: "258px",
        },
        maxWidth: 345,
      }}
    >
      <CardMedia sx={{
         height: {
          xs: "160px",
          sm: "160px",
          md: "140px",
          lg: "140px",
          xl: "140px",
         } 
         }} image={image} title="الفجر" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          fontFamily={"cairo"}
          sx={{color:"var(--prayer-info1)"}}
        >
          {name}
        </Typography>
        <Typography variant="h1" color="var(--prayer-info2)">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
