import React from 'react'
import Slider from './Slider'

export default (props) => {
  const getList = () => {
    return props.list.map((i, key) => {
      return (
        <a key={key} href={i.link} className="list-group-item list-group-item-action"
          aria-current="true" rel="noopener" target="_blank">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{i.name}</h5>
          </div>
          <p className="mb-1">{i.description}</p>
        </a>
      )
    })
  }

  return (
    <>
      <div id={props.name + '-modal'} className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.cardTitle}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{props.cardDescription}</p>
              <div className="list-group">
                {getList()}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Свернуть</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card text-center m-2">
        <div className="card-header"> {props.cardName} </div>
        <div className="card-body">
          <h5 className="card-title"> {props.cardTitle} </h5>
          <p className="card-text"> {props.cardDescription} </p>

          <Slider name={props.name} imgs={props.imgs} />

          <a href="#" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target={'#' + props.name + '-modal'}>
            Посмотреть полный список
          </a>
        </div>
        <div className="card-footer text-muted"> {props.cardQuot} </div>
      </div>
    </>
  )
}