import React from 'react'
function Todo(props) {
    return (
        <span>
            {
                props.completed ?
                    (
                        <span className="lsC">
                            <input type = "checkbox" onClick={props.onClick}></input>
                            <input className="lis todo" 
                            value={props.text} 
                            disabled>
                            </input>
                            <button onClick={props.remove} className="removebtn">
                                X
                            </button>
                        </span>
                    )
                    :
                    (
                        <span className="lsC">
                            <input type = "checkbox" onClick={props.onClick}></input>
                            <input className="todo" 
                            value={props.text} 
                            onChange={props.editChange}
                            placeholder = "Type to-do here" 
                            onKeyDown={(event)=>{if(event.key==='Enter'){
                                document.querySelector(".todo").blur()
                            }}}
                            >
                            </input> 
                            <button onClick={props.remove} className="removebtn">
                                X
                            </button>
                        </span>
                    )
            }
        </span>
    );
}
export default Todo;