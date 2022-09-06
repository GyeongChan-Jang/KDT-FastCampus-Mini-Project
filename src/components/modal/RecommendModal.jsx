import React, { forwardRef, useState } from 'react'
import style from '~/scss/Search.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/slices/userSlice'

const RecommedModal = ({ getDetail }) => {
  const navigate = useNavigate()
  // const applicationHandler = () => {
  //   navigate('/application')
  // }
  console.log('상세정보', getDetail)
  // const { companyName } = getDetail.data

  const dispatch = useDispatch()
  return (
    <div className={style.RecommendModal}>
      <section>
        <header>
          <div className={style.cart}>
            <span>신청카드 정보</span>

          </div>
        </header>
        <main>
          카드 내용
          {/* <p>{companyName}</p> */}
          </main>
        
        <footer>
          <button type='button'>장바구니 담기</button>
          <button type='button' onClick={() => dispatch(openModal(false))}>
            취소하기
          </button>
        </footer>
      </section>
    </div>
  )
}

export default RecommedModal
