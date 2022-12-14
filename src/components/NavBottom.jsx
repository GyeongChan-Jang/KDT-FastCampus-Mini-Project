import React from 'react'
import { Space } from 'antd-mobile'
import {
  CreditCardFilled,
  ShoppingFilled,
  WalletFilled
} from '@ant-design/icons'
import styles from '~/scss/NavBottom.module.scss'
import { Link, useLocation } from 'react-router-dom'

const NavBottom = () => {
  const { pathname } = useLocation()

  const data = [
    {
      title: '맞춤 상품',
      path: '/recomendation',
      icons: (
        <CreditCardFilled style={{ fontSize: '24px', marginBottom: '4px' }} />
      )
    },
    {
      title: '금융 상품',
      path: '/',
      icons: (
        <ShoppingFilled style={{ fontSize: '24px', marginBottom: '4px' }} />
      )
    },
    {
      title: '현명한 소비',
      path: '/consume',
      icons: <WalletFilled style={{ fontSize: '24px', marginBottom: '4px' }} />
    }
  ]

  return (
    <div className={styles.navContainer}>
      <nav>
        <Space size='large' className={styles.inner}>
          {data.map(({ title, path, icons }, index) => (
            <Link key={index} to={path} className={styles.links}>
              <div
                className={`${
                  pathname === path ? styles.activeItem : styles.normalItem
                }`}
              >
                <p>{icons}</p>
                <p>{title}</p>
              </div>
            </Link>
          ))}
        </Space>
      </nav>
    </div>
  )
}

export default NavBottom
