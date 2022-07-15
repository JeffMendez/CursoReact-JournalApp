import { ImageList, ImageListItem } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const ImageGallery = ({images}) => {

  if (!images) return;

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={3} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
