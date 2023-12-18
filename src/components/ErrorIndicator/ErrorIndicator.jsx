import { Alert, Space } from 'antd'

function ErrorIndicator({ message }) {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        marginBottom: '20px',
      }}
    >
      <Alert message="Error" description={message} type="error" showIcon />
    </Space>
  )
}

export default ErrorIndicator
