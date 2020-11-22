import styled from 'styled-components';

export const RestaurantView = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #C4C4C4;
  background-color: #FFF;
  min-width: 90%;
  margin-bottom: 20px;
  padding: 5px 10px;
`;

export const RestaurantInfo = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px 10px 20px;
`;

export const RestaurantPhoto = styled.Image`
  border-radius: 25px;
`;