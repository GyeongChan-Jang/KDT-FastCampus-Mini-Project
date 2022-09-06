import React, { useState } from 'react'
import Modal from '~/components/modal/Modal'
import style from '~/scss/Search.module.scss'
import Card from './Card'
import { getCookie } from '../utils/cookie'
import RecommendModal from '../components/modal/RecommendModal'
import {useInquireUserDataQuery} from '~/store/slices/userApiSlice'
import {
  useGetProductsQuery,
  useGetSearchMutation
} from '~/store/api/searchApiSlice'
import { FilterOutline, RightOutline, SearchOutline } from 'antd-mobile-icons'

function Search() {
  const [visible, setVisible] = useState(false)
  const tags = ['대출', '펀드', '카드', '멤버십', '적금']
  const tagContents = ['청년', '재테크', '코로나', '문화', '담보']
  const [checkedTag, setCheckedTag] = useState([])
  const [checkedTagContent, setCheckedTagContent] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [modal, setModal] = useState(false)
  const [isToken, setIsToken] = useState()


  const accessToken = getCookie('accessToken')

  const data = {
    query: searchInput,
    tag: checkedTag,
    tagContent: checkedTagContent
  }
  const [search, { data: getSearch }] = useGetSearchMutation()
  const { data: products, isLoading, isError } = useGetProductsQuery()
  console.log('products', products)

  const asyncUpFetch = () => {
    setIsClicked(true)
    search(data)
  }
  const handlerKeyPress = e => {
    if (e.key === 'Enter') {
      asyncUpFetch()
    }
  }

  

  const openModal = () => {
    
    setModal(true)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setModal(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <section>
      <h1>상품을 검색해주세요</h1>
      <div className={style.searchContainer}>
        <div className={style.search} onKeyPress={handlerKeyPress}>
          <input
            placeholder='Search...'
            onChange={event => setSearchInput(event.target.value)}
          />
          <SearchOutline
            fontSize={20}
            className={style.searchBtn}
            onClick={asyncUpFetch}
          />
        </div>
        <div>
          <FilterOutline
            fontSize={25}
            className={style.filterBtn}
            onClick={() => setVisible(visible => !visible)}
          />
        </div>
      </div>
      {visible ? (
        <div className={style.ButtonGroup}>
          <div>
            {tags.map(item => (
              <button
                key={item}
                onClick={() => {
                  !checkedTag.includes(item)
                    ? setCheckedTag(checkedTag => [...checkedTag, item])
                    : setCheckedTag(
                        checkedTag.filter(button => button !== item)
                      )
                }}
                className={
                  checkedTag.includes(item) ? `${style.On}` : `${style.Off}`
                }
              >
                {item}
              </button>
            ))}
          </div>
          <div>
            {tagContents.map(item => (
              <button
                key={item}
                onClick={() => {
                  !checkedTagContent.includes(item)
                    ? setCheckedTagContent(checkedTagContent => [
                        ...checkedTagContent,
                        item
                      ])
                    : setCheckedTagContent(
                        checkedTagContent.filter(button => button !== item)
                      )
                }}
                className={
                  checkedTagContent.includes(item)
                    ? `${style.On}`
                    : `${style.Off}`
                }
              >
                {item}
              </button>
            ))}
          </div>
          <button className={style.resultBtn} onClick={asyncUpFetch}>
            필터링된 결과 보기
            <RightOutline />
          </button>
        </div>
      ) : null}
      {isLoading ? (
        <div>로딩...</div>
      ) : isError ? (
        <div>에러발생</div>
      ) : isClicked === false ? (
        products?.map((product, index) => (
          <Card key={index} productData={product} openModal={openModal} />
        ))
      ) : (
        getSearch &&
        getSearch.map((product, index) => (
          <Card key={index} productData={product} openModal={openModal} />
        ))
      )}
      {
        accessToken === undefined ?
        <Modal open={modal} close={closeModal} />
        :<RecommendModal />
      }
      
      
    </section>
  )
}

export default Search
