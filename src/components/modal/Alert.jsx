import React from 'react'
import { useDispatch } from 'react-redux'
import '~/scss/Alert.scss'
import { openModal } from '../../store/slices/userSlice'

function Alert({ title, detail, confirm }) {
  const dispatch = useDispatch()
  return (
    <div>
      <div
        className='mask'
        onClick={() => {
          dispatch(openModal(false))
        }}
      >
        <div className='alertbox'>
          <div className='content'>
            <span className='title'>{title}</span>
            <span className='detail'>{detail}</span>
          </div>
          <div
            className='confirm'
            onClick={() => {
              dispatch(openModal(false))
            }}
          >
            <span>{confirm}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert
