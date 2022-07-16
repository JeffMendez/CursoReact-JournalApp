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
    <ImageList sx={{ width: '100%', height: 'auto' }} cols={2} rowHeight={300}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=300&h=300&fit=crop&auto=format`}
            srcSet={`${image}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
