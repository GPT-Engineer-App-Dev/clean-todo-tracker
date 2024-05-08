import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (inputValue.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: inputValue, isCompleted: false }]);
    setInputValue('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container centerContent maxW="container.md" padding="4">
      <VStack spacing={4} width="100%">
        <Input
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        <List spacing={3} width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <ListIcon as={task.isCompleted ? FaCheckCircle : FaTrash} color={task.isCompleted ? 'green.500' : 'red.500'} onClick={() => toggleTaskCompletion(task.id)} cursor="pointer" />
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', flexGrow: 1 }}>{task.text}</span>
              <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;