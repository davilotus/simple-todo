import { useState } from 'react'

import { Container, Flex, Card, Input, Button, Checkbox, Box, Heading, Text, useColorMode} from '@chakra-ui/react'
import { DeleteIcon, StarIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'

export function App() {

  const [todoInput, setTodoinput] = useState('')
  const [todoList, setTodoList] = useState([])
  const [todoListChecked, setTodoListChecked] = useState([])

  const { colorMode, toggleColorMode } = useColorMode()

  const addItem = item => {
    item && setTodoList([...todoList, item])
    setTodoinput('')
  }

  const removeItem = (item, list) => {

    if(list === todoList) {
      let newTodo = [...todoList]
      let index = todoList.indexOf(item)
  
      if (index > -1) { 
        newTodo.splice(index, 1)
        setTodoList(newTodo)
      }
    
    } else if(list === todoListChecked) {

      let newTodo = [...todoListChecked]
      let index = todoListChecked.indexOf(item)
  
      if (index > -1) { 
        newTodo.splice(index, 1)
        setTodoListChecked(newTodo)
      }
    }

  }

  const itemStatus = (item, status, list) => {

    if(status) {
      removeItem(item, list)
      setTodoListChecked([...todoListChecked, item])

    } else {
      addItem(item)

      let newTodo = [...todoListChecked]
      let index = todoListChecked.indexOf(item)
  
      if (index > -1) { 
        newTodo.splice(index, 1)
        setTodoListChecked(newTodo)
      }
    }

  }

  return (    
    <Flex 
      height={'100vh'} 
      justify="center"
      align={'center'}
      flexWrap={'wrap'} 
      flexDir={'column'}
      className="todo-list"
    >
      <Container size={'sm'} colorScheme={'gray'}>
        <Flex justifyContent={'space-between'} marginBottom={'10px'}>
          <Heading size={'lg'}  marginBottom={'5px'}>
            To do list
          </Heading>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>

        <form>
          <Flex gap={'5px'} className="addItem">
            <Input type="text" onChange={e => setTodoinput(e.target.value)} value={todoInput} placeholder={'Insert your item'}/>
            <Button type="submit" onClick={(e) => {e.preventDefault(); addItem(todoInput)}}>Add item</Button>
          </Flex>
         </form>

        {todoList.length ? (
          <Box marginTop={'20px'}>
            {todoList.map((todoItem, key) => {
              return (
                <Card key={key} padding={'10px'} marginBottom={'5px'}>
                  <Flex flexWrap={'wrap'} justifyContent={'space-between'}>
                    <Checkbox 
                      onChange={ e => itemStatus(todoItem, e.target.checked, todoList) } 
                      isChecked={false}
                    >
                      {todoItem}
                    </Checkbox>
                    <Button type="button" onClick={() => removeItem(todoItem, todoList)} _hover={{ background: 'red.500' }}><DeleteIcon /></Button>
                  </Flex>
                </Card>
              )
            })}
          </Box>
        ) : (
          (todoListChecked.length > todoList.length) ? (
            <Flex gap={'5px'} flexDirection={'column'} alignItems={'center'} padding={'30px 0'}>
              <StarIcon boxSize={8} color={'yellow.400'}/>
              <Text textAlign={'center'}>You completed your entire list!</Text>
            </Flex>
          ) : (null)
        )}

        {todoListChecked.length ? (
          <>
            <Box marginTop={'20px'} className="items items-checked">
              <Heading size={'sm'} marginBottom={'5px'}>{todoListChecked.length} Completed items</Heading>
              {todoListChecked.map((todoItem, key) => {
                return (
                  <Card key={key} padding={'10px'} marginBottom={'5px'}>
                    <Flex justifyContent={'space-between'}>
                      <Checkbox 
                        onChange={ e => itemStatus(todoItem, e.target.checked, todoListChecked) }
                        isChecked={true}
                      >
                        <s>{todoItem}</s>
                      </Checkbox>
                      <Button type="button" onClick={() => removeItem(todoItem, todoListChecked)} _hover={{ background: 'red.500' }}><DeleteIcon /></Button>
                    </Flex>
                  </Card>
                )
              })}
            </Box>
          </>
        ) : (
          null
        )}

      </Container>
    </Flex>
  )
}
