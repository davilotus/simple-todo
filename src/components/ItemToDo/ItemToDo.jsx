import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Card, Checkbox, Flex } from '@chakra-ui/react';

export function ItemToDo({ todoItem, itemStatus, toDoList, removeItem }) {
  return (
    <Card padding={'10px'} marginBottom={'5px'}>
      <Flex flexWrap={'wrap'} justifyContent={'space-between'}>
        <Flex flexDirection={'column'}>
          <Checkbox
            name="todoitem"
            onChange={(e) =>
              itemStatus(
                todoItem.item,
                todoItem.date,
                e.target.checked,
                toDoList
              )
            }
            isChecked={todoItem.checked ? true : false}
          >
            {todoItem.item}
          </Checkbox>
          <small
            style={{
              paddingLeft: '23px',
              fontSize: '.6875rem',
            }}
          >
            to do until {todoItem.date}
          </small>
        </Flex>
        <Button
          type="button"
          onClick={() => removeItem(todoItem.item, toDoList)}
          _hover={{ background: 'red.500' }}
        >
          <DeleteIcon />
        </Button>
      </Flex>
    </Card>
  );
}
