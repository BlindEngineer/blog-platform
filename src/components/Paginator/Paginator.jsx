import { ConfigProvider, Pagination } from 'antd'
import './Paginator.scss'

function Paginator({ currentPage, onChange, totalPages }) {
  return (
    <div className="paginator">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff',
          },
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          defaultCurrent={1}
          showSizeChanger={false}
          pageSize={5}
          current={currentPage}
          onChange={onChange}
          total={totalPages * 5}
        />
      </ConfigProvider>
    </div>
  )
}

export default Paginator
