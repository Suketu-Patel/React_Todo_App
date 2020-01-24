import React from 'react';
// import ReactDOM from 'react-dom';
import Card from './cardList'
var data = require("./todos.json")
class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{
                id: 0,
                subject: "",
                todos: [data]
            }],
            val: "",
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
        this.subjectChange = this.subjectChange.bind(this);
        this.handleCardRemove = this.handleCardRemove.bind(this);
    }
    handleEditChange(e, id, lid) {
        const list = [...this.state.cards[id].todos];
        const eNode = list.filter(item => item.id === lid);
        eNode[0].text = e.target.value;
        this.setState(this.state);
    }

    handleRemove(card_id, id) {
        const list = [...this.state.cards[card_id].todos];
        const updatedList = list.filter(item => item.id !== id);
        this.setState((state) => state.cards[card_id].todos = updatedList);
    }
    handleCardRemove(card_id){
        console.log(this.state.cards.length)
        if(this.state.cards.length === 1 ){
            this.setState({
                cards: [{
                    id: 0,
                    subject: "",
                    todos: [data]
                }],
                val: "",
            })
        }else{
            const list = [...this.state.cards];
            const updatedList = list.filter(item => item.id !== card_id);
            this.setState((state) => state.cards = updatedList);
        }
    }
    handleClick(li, card_id) {
        const list = [...this.state.cards[card_id].todos];
        const checkedNode = list.filter(item => item.id === li.id);
        checkedNode[0].completed = !checkedNode[0].completed;
        this.setState(this.state);    
    }
    handleAdd(e) {
        if (e.key === 'Enter') {
            let previd;
            if (this.state.cards.length === 0) {
                previd = 0;
            } else {
                previd = this.state.cards[this.state.cards.length - 1].id;
            }
            if (this.state.val === "") {
                return;
            }
            this.setState({
                cards: this.state.cards.concat([
                    { id: previd + 1, subject: this.state.val, todos: [] }
                ])
            })
        } else {
            return;
        }
        this.setState({
            val: ""
        })
        document.querySelector(".inputL").blur();
    }
    handleTodoAdd(c_id) {
        let previd;
        if (this.state.cards[c_id].todos.length === 0) {
            previd = 0;
        } else {
            previd = this.state.cards[c_id].todos[this.state.cards[c_id].todos.length - 1].id
        }
        this.setState((state) => state.cards[c_id].todos.push({
            id: previd + 1,
            text: "",
            completed: false
        }))
    }
    subjectChange(event, card_id) {
        const prevText = this.state.cards[card_id];
        prevText.subject = event.target.value;
        this.setState(this.state)
    }
    handleChange(event) {
        this.setState({ val: event.target.value })
    }
    render() {
        // console.log(this.state.cards.length)
        console.log("state",this.state)
        const cardlist = this.state.cards.map((card) => {
            return (
                <Card key={card.id}
                    value={this.state.cards[card.id].subject}
                    card_id={card.id}
                    list={card.todos}
                    subjectChange={this.subjectChange}
                    handleClick={this.handleClick}
                    handleEditChange={this.handleEditChange}
                    handleTodoAdd={this.handleTodoAdd}
                    handleRemove={this.handleRemove}
                    handleCardRemove = {this.handleCardRemove}
                />
            )
        });
        return (
            <div className="toDoList">
                <div className="heading">
                    <h1>To-Do List V2</h1>
                    <p>By: Suketu Patel</p>
                </div>
                <div className="wrapper">
                    <div className="inputPart">
                        <input className="inputL"
                            type="text"
                            value={this.state.val}
                            onChange={this.handleChange}
                            onKeyDown={this.handleAdd}
                            placeholder="Add New Todo" />
                    </div>
                    <div className="listPart">
                        {cardlist.length !== 0 && cardlist}
                    </div>
                </div>
            </div>
        )
    };
}
export default ToDoList;