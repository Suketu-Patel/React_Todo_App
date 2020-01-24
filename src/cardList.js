import React from 'react'
import Todo from './todo';

function Card(props) {
    return (
            <ul className="Card">
                <div className="dltC"><button className="dltCard" onClick={()=>props.handleCardRemove(props.card_id)}>X</button></div>
                <div><input className="inputSub" type="text" value={props.value} onChange={(e)=>props.subjectChange(e,props.card_id)} placeholder="Subject" />
                <button className="addBtn" onClick={()=>props.handleTodoAdd(props.card_id)}>+</button></div>
                <hr></hr>
                {
                    props.list.length ?
                    (props.list.map((li) => {
                        return (
                            <Todo key={li.id} refid={li.id}
                                onClick={() => props.handleClick(li, props.card_id)}
                                text={li.text}
                                completed={li.completed}
                                remove={() => props.handleRemove(props.card_id,li.id)}
                                editChange={(e) => props.handleEditChange(e, props.card_id, li.id)} ></Todo>
                        )
                    })) :
                    (<span></span>)
                }
            </ul>
    )
}
export default Card;