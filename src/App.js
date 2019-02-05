import React, {Component} from 'react';
import './App.css';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

    id = 3

    state = {
        input: '',
        todos: [
            {id: 0, text: '리액트 소개1', checked: false},
            {id: 1, text: '리액트 소개2', checked: true},
            {id: 2, text: '리액트 소개3', checked: false}
        ],
        color: '#343a40',
    }

    colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6']


    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleCreate = () => {
        const {input, todos, color} = this.state
        if(input.length===0) return false
        this.setState({
            input: '',
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false,
                color
            })
        })
    }

    handleToggle = (id) => {
        const {todos} = this.state
        const index = todos.findIndex(todo => todo.id === id)
        const selected = todos[index]

        const nextTodos = [...todos]

        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        }

        this.setState({
            todos: nextTodos
        })
    }

    handleRemove = (id) => {
        const {todos} = this.state
        this.setState({
            todos: todos.filter(todo => todo.id !==id)
        })
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleCreate()
        }
    }

    handleSelectColor = (color) => {
        this.setState({
            color
        })
    }


    render() {
        const {input, todos, color} = this.state
        const { handleSelectColor, handleChange, handleCreate, handleKeyPress, handleToggle, handleRemove} = this

        return (
            <TodoListTemplate
                palette={(
                    <Palette
                        onSelect={handleSelectColor}
                        colors={colors}
                        selected={color}
                        />
                )}
                form={(
                    <Form
                        value={input}
                        color={color}
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                        onCreate={handleCreate} />
                )}
                children={(
                    <TodoItemList
                        todos={todos}
                        color={color}
                        onToggle={handleToggle}
                        onRemove={handleRemove} />
                )}
            >
            </TodoListTemplate>
        );
    }
}

export default App;
