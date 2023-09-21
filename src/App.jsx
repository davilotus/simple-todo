import { useState } from 'react';

import { DeleteIcon, MoonIcon, StarIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
} from '@chakra-ui/react';

export function App() {
  const todayDate = new Date().toJSON().slice(0, 10);
  const [toDoInput, setToDoInput] = useState('');
  const [toDoDate, setToDoDate] = useState(todayDate);
  const [toDoList, setToDoList] = useState([]);
  const [toDoListChecked, setToDoListChecked] = useState([]);

  const { colorMode, toggleColorMode } = useColorMode();

  const addItem = (item, date) => {
    if (item && date) {
      setToDoList([...toDoList, { item: item, date: date }]);
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

  const itemStatus = (item, date, status, list) => {
    if (status) {
      removeItem(item, list);
      setToDoListChecked([...toDoListChecked, { item: item, date: date }]);
    } else {
      addItem(item, date);

      let newTodo = [...toDoListChecked];
      let exists = toDoListChecked.find((toFind) => toFind.item === item);

      if (exists) {
        newTodo = newTodo.filter((item) => item !== exists);
        setToDoListChecked(newTodo);
      }
    }
  };

  return (
    <Flex
      height={'100vh'}
      justify="center"
      align={'center'}
      flexWrap={'wrap'}
      flexDir={'column'}
    >
      <Container size={'sm'} colorScheme={'gray'}>
        <Flex justifyContent={'space-between'} marginBottom={'10px'}>
          <Heading size={'lg'} marginBottom={'5px'}>
            To do list
          </Heading>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>

        <form>
          <Flex gap={'5px'} className="addItem">
            <Input
              type="text"
              value={toDoInput}
              placeholder={'Insert your item'}
              onChange={(e) => setToDoInput(e.target.value)}
            />
            <Input
              placeholder="Select Date"
              min={todayDate}
              value={todayDate}
              type="date"
              width={'250px'}
              onChange={(e) => setToDoDate(e.target.value)}
            />
            <Button
              width={'150px'}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                addItem(toDoInput, toDoDate);
              }}
            >
              Add item
            </Button>
          </Flex>
        </form>

        {toDoList.length ? (
          <Box marginTop={'20px'}>
            {toDoList.map((todoItem, key) => {
              return (
                <Card key={key} padding={'10px'} marginBottom={'5px'}>
                  <Flex flexWrap={'wrap'} justifyContent={'space-between'}>
                    <Flex flexDirection={'column'}>
                      <Checkbox
                        onChange={(e) =>
                          itemStatus(
                            todoItem.item,
                            todoItem.date,
                            e.target.checked,
                            toDoList
                          )
                        }
                        isChecked={false}
                      >
                        {todoItem.item}
                      </Checkbox>
                      <small
                        style={{
                          'padding-left': '23px',
                          'font-size': '.6875rem',
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
            })}
          </Box>
        ) : toDoListChecked.length > toDoList.length ? (
          <Flex
            gap={'5px'}
            flexDirection={'column'}
            alignItems={'center'}
            padding={'30px 0'}
          >
            <StarIcon boxSize={8} color={'yellow.400'} />
            <Text textAlign={'center'}>You completed your entire list!</Text>
          </Flex>
        ) : null}

        {toDoListChecked.length ? (
          <>
            <Box marginTop={'20px'} className="items items-checked">
              <Heading size={'sm'} marginBottom={'5px'}>
                {toDoListChecked.length} Completed items
              </Heading>

              {toDoListChecked.map((todoItem, key) => {
                return (
                  <Card key={key} padding={'10px'} marginBottom={'5px'}>
                    <Flex justifyContent={'space-between'}>
                      <Flex flexDirection={'column'}>
                        <Checkbox
                          onChange={(e) =>
                            itemStatus(
                              todoItem.item,
                              todoItem.date,
                              e.target.checked,
                              toDoListChecked
                            )
                          }
                          isChecked={true}
                        >
                          <s style={{ opacity: '.5' }}>
                            <i>{todoItem.item}</i>
                          </s>
                        </Checkbox>
                        <small
                          style={{
                            'padding-left': '23px',
                            opacity: '.5',
                            'font-size': '.6875rem',
                          }}
                        >
                          to do until {todoItem.date}
                        </small>
                      </Flex>
                      <Button
                        type="button"
                        onClick={() =>
                          removeItem(todoItem.item, toDoListChecked)
                        }
                        _hover={{ background: 'red.500' }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Flex>
                  </Card>
                );
              })}
            </Box>
          </>
        ) : null}
      </Container>
    </Flex>
  );
}
