import React from "react";
import Image from "next/image";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardContent, CardMedia, makeStyles } from "@material-ui/core";

const DEFAULT_IMAGE_PATH = "../../public/images/no-img.jpg";

const styles = makeStyles({
  cardImage: {
    width: "100%",
    height: "auto",
    maxHeight: "140px",
  },
});

export const CoursePreview = ({ title, start, duration, image }) => {
  const classes = styles();

  return (
    <Card>
      <CardActionArea onClick={() => {}}>
        <CardMedia
          className={classes.cardImage}
          component={
            <Image
              src={image ?? DEFAULT_IMAGE_PATH}
              alt="Картинка превью курса"
            />
          }
        />
        <CardContent>
          <Typography gutterBottom component="h4">{title}</Typography>
          <div>
            <Typography variant="body2">{start}</Typography>
            <Typography variant="body2">{duration}</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
