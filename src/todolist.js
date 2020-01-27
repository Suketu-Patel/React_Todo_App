import React from 'react';
import Card from './cardList';
import axios from 'axios';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{
                id: 0,
                subject: "",
                todos: [
                    {
                        id: 0,
                        text: "Sammple to-do",
                        completed: false
                    }
                ]
            }],
            val: ""
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
    storeResult() {
        axios.post("http://localhost:3005/store", { state: this.state }).then(res => {
        })
    }
    handleEditChange(e, c_id, lid) {
        console.log("handleEditChange")
        const list = [...this.state.cards];
        const cNode = list.filter(item => item.id === c_id);
        const list2 = [...cNode[0].todos];
        const eNode = list2.filter(item => item.id === lid);
        eNode[0].text = e.target.value;
        this.setState(this.state);
        this.storeResult()
    }
    handleRemove(c_id, lid) {
        console.log("handleRemove")
        const list = [...this.state.cards];
        const cNode = list.filter(item => item.id === c_id);
        const list2 = [...cNode[0].todos];
        const updatedList = list2.filter(item => item.id !== lid);
        // console.log("State",list)
        // this.setState((state) => cNode[0].todos = updatedList);
        cNode[0].todos = updatedList;
        this.setState(this.state);
        this.storeResult()

    }
    handleCardRemove(card_id) {
        console.log("handleCardRemove")
        if (this.state.cards.length === 1) {
            this.setState({
                cards: [{
                    id: 0,
                    subject: "",
                    todos: [{
                        "id": 0,
                        "text": "Sample to-do",
                        "completed": false
                    }]
                }],
                val: "",
            })
        } else {
            const list = this.state.cards;
            const updatedList = list.filter(item => item.id !== card_id);
            // console.log(updatedList)
            this.setState({
                cards:updatedList
            });
        }
        this.storeResult()
    }
    handleClick(li, card_id) {
        console.log("handleClick")
        const list = [...this.state.cards];
        const toDoList = list.filter(item => item.id === card_id);
        console.log(toDoList,li.id)
        const checkedNode = toDoList[0].todos.filter(item => item.id === li.id);
        console.log(checkedNode)
        checkedNode[0].completed = !checkedNode[0].completed;
        this.setState(this.state);
        this.storeResult()

    }
    handleAdd(e) {
        console.log("handleAdd");
        
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
            this.setState((state) =>
                state.cards.push(
                    {
                        id: previd + 1,
                        subject: this.state.val,
                        todos: []
                    }
                )
            )
        } else {
            return;
        }
        console.log("FIRED")
        this.setState({
            val: ""
        })
        console.log("Storing")
        this.storeResult()
        document.querySelector(".inputL").blur();

    }
    handleTodoAdd(c_id) {
        console.log("handleTodoAdd");
        let previd;
        const list = [...this.state.cards];
        const eNode = list.filter(item => item.id === c_id);
        if (eNode[0].todos.length === 0) {
            previd = 0;
        } else {
            previd = eNode[0].todos[eNode[0].todos.length - 1].id
        }
        eNode[0].todos.push({
            id: previd + 1,
            text: "",
            completed: false
        })
        this.setState(this.state);
        this.storeResult()

    }

    handleChange(event) {
        console.log("handleChange");
        this.setState({ val: event.target.value })
    }

    componentDidMount() {
        axios.get("http://localhost:3005/todos.json").then((res) => {
            this.setState(
                res.data
            )
            console.log("Mounted")
        })
    }

    subjectChange(event, card_id) {
        console.log("subjectChange");
        const list = this.state.cards;
        const eNode = list.filter(item => item.id === card_id);
        eNode[0].subject = event.target.value;
        this.setState(this.state)
        this.storeResult()

    }
    subjectHandler(cid) {
        console.log("subjectHandler");
        const list = [...this.state.cards];
        const eNode = list.filter(item => item.id === cid);
        return eNode[0].subject;
    }
    render() {
        console.log("--------------------")
        const cardlist = this.state.cards.map((card) => {
            return (
                <Card key={card.id}
                    value={this.subjectHandler(card.id)}
                    card_id={card.id}
                    list={card.todos}
                    subjectChange={this.subjectChange}
                    handleClick={this.handleClick}
                    handleEditChange={this.handleEditChange}
                    handleTodoAdd={this.handleTodoAdd}
                    handleRemove={this.handleRemove}
                    handleCardRemove={this.handleCardRemove}
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