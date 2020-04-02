import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import { FadeTransition } from '../../transition/FadeTransition/FadeTransition';
import { StyledFadeTransition } from '../../transition/StyledFadeTransition/StyledFadeTransition';
import { BicycleFadeTransition } from '../../transition/BicycleFadeTransition/BicycleFadeTransition';

const Overlay = styled.div`
  background-color: black;
  opacity: 0.5;

  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 100;
`;

const ModalContainer = styled.div`
  position: fixed;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 200;
`;

const CardModalContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

export function CardModal({ onClose, children, isShow }) {
  return (
    <FadeTransition isShow={isShow}>
      <CardModalContainer>
        <Overlay onClick={onClose} />

        <ModalContainer>
          <Card>
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
            {children}
          </Card>
        </ModalContainer>
      </CardModalContainer>
    </FadeTransition>
  );
}
