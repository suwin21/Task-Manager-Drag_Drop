import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f0f4f8;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .unassigned-tasks {
    background-color: #34495e;
    padding: 10px;
    border-radius: 5px;
    height: 100%;
    overflow-y: auto;
  }
  .task {
    background-color: #ffffff;
    color: #2c3e50;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

export const TaskListSection = styled.div`
  display: flex;
  gap: 20px;
`;

export const TaskListWrapper = styled.div`
  width: 300px;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .task {
    background-color: #ffffff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #3498db;
  }
`;
