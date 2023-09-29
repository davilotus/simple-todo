import { createContext, useEffect, useState } from 'react';

export const ToDoContext = createContext({});

export const ToDoProvider = ({ children }) => {
  const todayDate = new Date().toJSON().slice(0, 10);
  const [toDoDate, setToDoDate] = useState(todayDate);
  const [toDoListChecked, setToDoListChecked] = useState([]);
  const [toDoInput, setToDoInput] = useState('');
  const [toDoList, setToDoList] = useState([]);

  const addItem = (item, date, checked) => {
    if (item && date) {
      setToDoList([...toDoList, { item: item, date: date, checked: checked }]);
      setToDoInput('');
    }
  };

  const removeItem = (item, list) => {
    if (list === toDoList) {
      let newTodo = [...toDoList];
      let exists = toDoList.find((toFind) => toFind.item === item);

      if (exists) {
        newTodo = newTodo.filter((item) => item !== exists);
        setToDoList(newTodo);
      }
    } else if (list === toDoListChecked) {
      let newTodo = [...toDoListChecked];
      let exists = toDoListChecked.find((toFind) => toFind.item === item);

      if (exists) {
        newTodo = newTodo.filter((item) => item !== exists);
        setToDoListChecked(newTodo);
      }
    }
  };

  const itemStatus = (item, date, checked, list) => {
    if (checked) {
      removeItem(item, list);
      setToDoListChecked([
        ...toDoListChecked,
        { item: item, date: date, checked: true },
      ]);
    } else {
      addItem(item, date, false);

      let newTodo = [...toDoListChecked];
      let exists = toDoListChecked.find((toFind) => toFind.item === item);

      if (exists) {
        newTodo = newTodo.filter((item) => item !== exists);
        setToDoListChecked(newTodo);
      }
    }
  };

  useEffect(() => {
    setToDoDate(todayDate);
  }, [todayDate]);

  useEffect(() => {
    setToDoDate((date) => date);
  }, [toDoDate]);

  return (
    <ToDoContext.Provider
      value={{
        addItem,
        removeItem,
        itemStatus,
        toDoListChecked,
        toDoInput,
        setToDoInput,
        toDoList,
        todayDate,
        toDoDate,
        setToDoDate,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
