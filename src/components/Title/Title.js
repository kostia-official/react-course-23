import React from "react";
import styled from "styled-components";

export const Title = styled.b`
  display: block;
  font-size: ${({ fontSize }) => fontSize || "x-large"};
  margin: 20px 0 20px 0;
`;
