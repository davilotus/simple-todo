import { useContext } from 'react';

import { ToDoContext } from './contexts/TodoContext';

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
import { Author } from './components/Author/Author';

export function App() {
  const {
    toDoInput,
    setToDoInput,
    toDoList,
    toDoListChecked,
    itemStatus,
    removeItem,
    addItem,
    todayDate,
    toDoDate,
    setToDoDate,
  } = useContext(ToDoContext);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
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
            <Button
              onClick={toggleColorMode}
              _hover={{ background: 'blue.500' }}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>

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
                  addItem(toDoInput, toDoDate);
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

          {toDoList?.length ? (
            <Box marginTop={'20px'}>
              {toDoList.map((todoItem, key) => {
                return (
                  <Card key={key} padding={'10px'} marginBottom={'5px'}>
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
                          isChecked={false}
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
              })}
            </Box>
          ) : toDoListChecked?.length > toDoList?.length ? (
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

          {toDoListChecked?.length ? (
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
                            name="itemdone"
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
      <Author />
    </>
  );
}
