import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Tr
} from "@chakra-ui/react";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import Pagination from "react-js-pagination";
import { getPointsDetails } from "../../api/account"
import { formatTime } from "../../utils/tool"
import { PointDetailsProps } from "../../interface/account"

const PAGE_SIZE = 10

export default forwardRef((_, ref) => {

  const [data, setData] = useState<PointDetailsProps[]>([])
  // 分页相关
  const [pagination, setPagination] = useState({ page: 1, total: 0 })

  useEffect(() => {
    pageChange(pagination.page)
  }, [])

  // 获取分页数据
  const pageChange = async (page:number) => {
    const res = await getPointsDetails({ pageIndex: page, pageSize: PAGE_SIZE })
    if(res.code === 0){
      setData(res.data.dataList)
      setPagination({ page: res.data.current, total: res.data.total })
    }
  }
  useImperativeHandle(ref, () => ({
    refresh: () => pageChange(pagination.page),
    clearData: () => setData([])
  }))
  return (
    <TableContainer>
      <Table
        variant='simple'
        borderTop="1px solid #626262"
        borderBottom="1px solid #626262"
        className="point-table"
      >
        <Thead  fontSize="14px">
          <Tr>
            <Td borderColor="#626262">Date</Td>
            <Td borderColor="#626262">Income/Expend</Td>
            <Td borderColor="#626262">Details</Td>
          </Tr>
        </Thead>
        <Tbody fontSize="12px">{data.map((v, i) => {
          return (
            <Tr key={i}>
              <Td border="none">{formatTime(v.rewardTime)}</Td>
              <Td border="none" color={v.rewardType===1 ? "#00FFA8" : "red.500"}>{v.rewardType===1 ? "+" : "-"}{v.rewardPoint}</Td>
              <Td border="none">{v.detail}</Td>
            </Tr>
          )
        })}</Tbody>
      </Table>
      <Pagination
        totalItemsCount={pagination.total}
        activePage={pagination.page}
        itemsCountPerPage={PAGE_SIZE}
        onChange={pageChange}
        innerClass="point-pagination"
        itemClass="point-pagination-item"
        activeClass="active"
        lastPageText="last"
        firstPageText="first"
      />
    </TableContainer>
  )
})