import { Space } from 'antd'

import ripple from './Ripple.svg'

function LoadingIndicator() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        marginBottom: '20px',
        textAlign: 'center',
      }}
    >
      <img src={ripple} alt="Загрузка..." style={{ height: '50px' }} />
    </Space>
  )
}

export default LoadingIndicator
