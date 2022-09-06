import React from 'react'

import style from '~/scss/Search.module.scss'
import { StarOutlined, StarFilled, SwapRightOutlined } from '@ant-design/icons'
import { getCookie } from '../utils/cookie'
import { useState } from 'react'
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoriteQuery
} from '../store/api/favoriteApiSlice'

const Card = ({ productData, openModal }) => {
  const { data: favorite, isLoading, isError } = useGetFavoriteQuery()
  const isFavorite = favorite?.find(item => item.id === productData.id)
  const [addFavorite] = useAddFavoriteMutation()
  const [deleteFavorite] = useDeleteFavoriteMutation()
  const accessToken = getCookie('accessToken')

  const onFavoriteHandler = id => {
    console.log(isFavorite)
    isFavorite ? deleteFavorite(id) : addFavorite(id)
    console.log(id)
  }
  // isError && alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요!')
  return (
    <div className={style.Card}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}
      >
        <img src={productData?.logo}></img>
        <button
          id={style.favStar}
          onClick={() => onFavoriteHandler(productData.id)}
        >
          {isFavorite ? (
            <StarFilled style={{ fontSize: '20px' }} />
          ) : (
            <StarOutlined style={{ fontSize: '20px' }} />
          )}
        </button>
      </div>
      <h2>{productData?.companyName}</h2>
      <h3>{productData?.productName}</h3>
      <h4>{productData?.description}</h4>
      <p style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p onClick={()=> openModal(accessToken) }>
          <span>신청하기</span>
          <SwapRightOutlined />
        </p>
      </p>
    </div>
  )
}

export default Card
