import React from 'react'


const viewCity = (props) => {
    return(<div className="card text-center" style={{width:"30%",margin:"auto",marginTop:"20px"} }>
    <div className="card-body">
      <h5 className="card-title">{props.name}</h5>
      <p className="card-text">{props.description}.</p>
      <a  className="btn btn-primary" onClick={props.update}>Update</a><br/><br/>
      <a  className="btn btn-warning" onClick={props.delete}>Delete</a>
    </div>
  </div>)
}

export default viewCity;