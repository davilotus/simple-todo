import { useContext } from 'react';

import { ItemToDo } from './components/ItemToDo/ItemToDo';
import { ToDoContext } from './contexts/TodoContext';

import { MoonIcon, StarIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Author } from './components/Author/Author';
import { Form } from './components/Form/Form';

export function App() {
  const { toDoList, toDoListChecked, itemStatus, removeItem } =
    useContext(ToDoContext);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex
        justify="center"
        align={'center'}
        flexWrap={'wrap'}
        flexDir={'column'}
        minHeight={'100vh'}
        padding={' 50px 0 60px'}
      >
        <Container size={'sm'} colorScheme={'gray'}>
          <Flex justifyContent={'space-between'} flexWrap={'wrap'}>
            <Flex
              justifyContent={'space-between'}
              marginBottom={'10px'}
              width={'100%'}
            >
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
            <Form />
          </Flex>

          {toDoList?.length ? (
            <Box marginTop={'20px'}>
              {toDoList.map((todoItem, key) => {
                return (
                  <ItemToDo
                    key={key}
                    todoItem={todoItem}
                    itemStatus={itemStatus}
                    toDoList={toDoList}
                    removeItem={removeItem}
                  />
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
                    <ItemToDo
                      key={key}
                      todoItem={todoItem}
                      itemStatus={itemStatus}
                      toDoList={toDoListChecked}
                      removeItem={removeItem}
                    />
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
