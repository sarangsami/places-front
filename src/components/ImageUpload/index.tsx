import { Box, Button, CardMedia, FormHelperText } from "@mui/material";
import { useEffect, useState } from "react";
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { AuthFormData } from "types";

import noProfile from "assets/images/no-profile.png";

const ImageUpload = (props: {
  setValue: UseFormSetValue<AuthFormData>;
  hasError: string;
  clearErrors: UseFormClearErrors<AuthFormData>;
}) => {
  const { setValue, hasError, clearErrors } = props;
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
      setValue("image", currentFile);
      clearErrors("image");
      setFile(currentFile);
    }
  };
  return (
    <div>
      <Box display="flex" alignItems="center" flexDirection="column" my={2}>
        <CardMedia
          component="img"
          alt="uploaded Image"
          image={previewURL === "" ? noProfile : previewURL}
          sx={{
            height: 200,
            width: 200,
            border: (glTheme) =>
              `2px solid ${glTheme.palette.background.default}`,
            mb: 2,
            borderRadius: 2,
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
