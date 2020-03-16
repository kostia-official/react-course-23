import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export function Spinner() {
  return (
    <Container>
      <CircularProgress color="secondary" disableShrink />
    </Container>
  );
}
