import { useContext } from 'react';
import { ToDoContext } from '../../contexts/TodoContext';

import { Button, Flex, Input } from '@chakra-ui/react';

export function Form() {
  const { toDoInput, todayDate, toDoDate, setToDoInput, setToDoDate, addItem } =
    useContext(ToDoContext);

  return (
    <form>
      <Flex gap={'5px'} className="addItem">
        <Input
          type="text"
          value={toDoInput}
          name="todo"
          placeholder={'Insert your item'}
          onChange={(e) => setToDoInput(e.target.value)}
        />
        <Input
          placeholder="Select Date"
          min={todayDate}
          value={toDoDate}
          type="date"
          name="date"
          width={'250px'}
          onChange={(e) => setToDoDate(e.target.value)}
        />
        <Button
          disabled={toDoInput ? true : false}
          width={'150px'}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addItem(toDoInput, toDoDate, false);
          }}
          _hover={
            toDoInput
              ? { background: 'blue.500' }
              : { pointerEvents: 'none', cursor: 'not-allowed' }
          }
        >
          Add item
        </Button>
      </Flex>
    </form>
  );
}
