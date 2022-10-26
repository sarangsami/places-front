import { Box, Button, CardMedia, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";

import noProfile from "assets/images/no-profile.png";
import noImage from "assets/images/no-image.png";

const ImageUpload = (props: {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPlace?: boolean;
  hasError: string;
}) => {
  const { hasError, handleImageChange, newPlace } = props;
  const [previewURL, setPreviewURL] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result;
      setPreviewURL(`${result}`);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      const currentFile = event.target.files[0];
      handleImageChange(event);
      setFile(currentFile);
    }
  };

  const imageURL = () => {
    if (previewURL === "") {
      if (newPlace) {
        return noImage;
      } else {
        return noProfile;
      }
    } else {
      return previewURL;
    }
  };
  return (
    <div>
      <Box display="flex" alignItems="center" flexDirection="column" my={2}>
        <CardMedia
          component="img"
          alt="uploaded Image"
          image={imageURL()}
          sx={{
            height: newPlace ? 400 : 200,
            width: newPlace ? "100%" : 200,
            border: (glTheme) =>
              `2px solid ${glTheme.palette.background.default}`,
            mb: 2,
            borderRadius: 2,
            objectFit: "contain",
          }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ width: "inherit", mb: 1 }}
        >
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleChange}
          />
        </Button>
        {hasError === "" ? null : (
          <FormHelperText error>{hasError}</FormHelperText>
        )}
      </Box>
    </div>
  );
};

export default ImageUpload;
