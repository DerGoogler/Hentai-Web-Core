import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFetch } from "usehooks-ts";
import { useStrings } from "@Hooks/useStrings";
import { useState } from "react";

interface ImageLoaderProps {
  src: string;
}

export const StyledImage = styled("img")({
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.12)",
  borderRadius: 8,
  border: "none",
  marginTop: 4,
  marginBottom: 4,
});

export const ImageLoader = (props: ImageLoaderProps) => {
  const { strings } = useStrings();
  const [imageError, setImageError] = useState(false);
  const { data, error } = useFetch<string>(
    "https://raw.githubusercontent.com/DerGoogler/cdn/master/others/hentai-web/images/" +
      props.src.replace(/\s/g, "").toLowerCase() +
      ".json"
  );

  const id = Math.floor(Math.random() * 900000000);

  if (!data || error || imageError) return <></>;

  const image = data[Math.floor(Math.random() * data.length)];
  const name = props.src.charAt(0).toUpperCase() + props.src.slice(1);

  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        bgcolor: theme.palette.background.default,
      })}
      style={{ marginTop: 8 }}
    >
      <CardMedia
        onError={() => {
          setImageError(true);
        }}
        component="img"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={(theme) => ({
            color: theme.palette.primary.light,
          })}
          onClick={() => {
            window.open(image, "_blank");
          }}
        >
          {strings.open_image}
        </Button>
      </CardActions>
    </Card>
  );
};
