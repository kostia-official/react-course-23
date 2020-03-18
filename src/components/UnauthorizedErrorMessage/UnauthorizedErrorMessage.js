import React from 'react';
import { CenterText } from '../CenterText/CenterText';

export const UnauthorizedErrorMessage = () => (
  <CenterText>
    <div>
      <span>Запрос успешно зафейлился</span>
    </div>
    <div>
      <span>У тебя есть доступ только на чтение</span>
    </div>
  </CenterText>
);
