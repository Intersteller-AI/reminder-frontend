// @ts-nocheck

import { Button } from "@mui/joy";
import { LoadingButton } from "@mui/lab";

const SubmitButton = ({
  changeRef,
  createNewIsLoading,
  updateIsLoading,
  handleSubmit,
}) => {
  return (
    <div
      ref={changeRef}
      className={`relative`}
      style={{
        display: "none",
      }}
    >
      {createNewIsLoading || updateIsLoading ? (
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
      ) : (
        <Button onClick={handleSubmit} variant="outlined">
          Submit
        </Button>
      )}
    </div>
  );
};

export default SubmitButton;
