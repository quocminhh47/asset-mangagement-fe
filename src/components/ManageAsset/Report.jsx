import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AssetsService from '../../service/AssetsService'
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';
import './css/pagination.css';
import ExportExcel from '../../util/ExportExcel';


import {
    ReplayOutlined,
    CloseOutlined,
    CheckOutlined,
    CreateOutlined,
    FilterAltOutlined,
    SearchOutlined,
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    South,
} from '@mui/icons-material';



const Container = styled.div`
    margin-top: 100px;
`;

// Recent Orders
const RecentOrders = styled.div`
    margin-top: 3.3rem;
`;

const H2 = styled.h2`
    padding-left: 29px;
    margin-bottom: 1.2rem;
    color: "red";
`;

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    padding: var(--card-padding);
    text-align: left;
    transition: all 300ms ease;
    position: relative;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
    &:hover {
        background: var(--color-light);
    }
`;

const Tbody = styled.tbody``;

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: #65676a;
`;

const A = styled.a`
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: var(--color-primary);
`;




const Th = styled.th`
    border-bottom: 1px solid #34383c;
    min-width: 50px;
    color: #34383c;
`;

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const ThSpan = styled.span``;

const ThSortIcon = styled.div``;

const Label = styled.label`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
`;

const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
`;

const InputDate = styled.input`
    border: 1px solid #bebebe;
    min-width: 200px;
    height: 43px;
    margin: 0px 30px 0px 0px;
    outline: none;
    color: #191919;
    border-radius: 5px;
    padding: 0px 10px;
    box-sizing: border-box;
    position: relative;
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        left: 159px;
        width: 1px;
        height: 79px;
        background-color: #bebebe;
    }
`


const Report = () => {

    const navigate = useNavigate();
    // State
    const [isSortNo, setIsSortNo] = useState(false);
    const [isSortAssetCode, setIsSortAssetCode] = useState(false);
    const [isSortAssetName, setIsSortAssetName] = useState(false);
    const [isSortAssignedTo, setIsSortAssignedTo] = useState(false);
    const [isSortAssignedBy, setIsSortAssignedBy] = useState(false);
    const [isSortAssignedDate, setIsSortAssignedDate] = useState(false);
    const [isSortState, setIsSortState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //data
    const [reportList, setReportList] = useState([])
    const [orderState, setOrderState] = useState("ASC")
    //pagination
    const [pageNo, setPageNo] = useState(0)
    const [totalPage, setTotalPage] = useState()
    const [totalElements, setTotalElements] = useState(0)
    const [pageSize, setPageSize] = useState(0)

    //change page
    const changePage = ({ selected }) => {
        setPageNo(selected)
    }

    //fetch asset report
    useEffect(() => {

        AssetsService.getReport(pageNo)
            .then(res => {
                setReportList(res.data.assetContent)
                setPageNo(res.data.pageNo)
                setPageSize(res.data.pageSize)
                setTotalPage(res.data.totalPages)
            })
            .catch(err => console.log(err))
    }, [pageNo])

    // ============sorting colum=============
    const sortingName = (col) => {
        setIsSortNo(prev => !prev)
        if (orderState === "ASC") {
            const sorted = [...reportList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setReportList(sorted)
            setOrderState("DSC")
        }
        if (orderState === "DSC") {
            const sorted = [...reportList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setReportList(sorted)
            setOrderState("ASC")
        }
    }

    const sortingNumber = (col) => {
        setIsSortAssetCode(prev => !prev)
        if (orderState === "ASC") {
            const sorted = [...reportList].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            setReportList(sorted)
            setOrderState("DSC")
        }
        if (orderState === "DSC") {
            const sorted = [...reportList].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setReportList(sorted)
            setOrderState("ASC")
        }
    }
    

    //export report to excel
    const exportToExcel = () => {
        AssetsService.exportToExcel()
            .then(res => {
                const date = new Date();
                console.log(res.data);
                ExportExcel.exportExcel(res.data, "Asset Report", "asset_report" + date.getTime().toString())
            })
            .catch(err => console.log(err))

    }

    return (
        <Container>
            <H2 style={{ color: "red" }}>Report: </H2> <br />
            <div style={{ "width": "100%", "display": "flex", "justifyContent": "flex-end " }}>
                <Button variant="danger"
                    style={{ "marginRight": "100px" , marginBottom:"10px"}}
                    id = "btn_export"
                    onClick={() => exportToExcel()}
                >
                    Export
                </Button>
            </div>

            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            <ThContainer
                                onClick={() =>  sortingName("name")}
                            >
                                <ThSpan>Category</ThSpan>
                                <ThSortIcon>
                                    {isSortNo ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>
                            <ThContainer
                                onClick={() => sortingNumber("total")}
                            >
                                <ThSpan>Total</ThSpan>
                                <ThSortIcon>
                                    {isSortAssetCode ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>
                            <ThContainer
                                onClick={() => {
                                    setIsSortAssetName(prev => !prev)
                                    sortingNumber("assigned")
                                }}
                            >
                                <ThSpan>Assigned</ThSpan>
                                <ThSortIcon>
                                    {isSortAssetName ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>
                            <ThContainer
                                onClick={() => {
                                    setIsSortAssignedTo(prev => !prev)
                                    sortingNumber("available")
                                }}
                            >
                                <ThSpan>Available</ThSpan>
                                <ThSortIcon>
                                    {isSortAssignedTo ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>
                            <ThContainer
                                onClick={() => {
                                    setIsSortAssignedBy(prev => !prev)
                                    sortingNumber("notAvailable")
                                }}
                            >
                                <ThSpan>Not available</ThSpan>
                                <ThSortIcon>
                                    {isSortAssignedBy ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>
                            <ThContainer
                                onClick={() => {
                                    setIsSortAssignedDate(prev => !prev)
                                    sortingNumber("waitingForRecycled")
                                }}
                            >
                                <ThSpan>Waiting for recycling</ThSpan>
                                <ThSortIcon>
                                    {isSortAssignedDate ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>
                            <ThContainer
                                onClick={() => {
                                    setIsSortState(prev => !prev)
                                    sortingNumber("recycled")
                                }}
                            >
                                <ThSpan>Recycled</ThSpan>
                                <ThSortIcon>
                                    {isSortState ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                </ThSortIcon>
                            </ThContainer>
                        </Th>

                    </Tr>
                </Thead>
                {
                    isLoading ? (
                        <div class="spinner-border text-warning" style={{ color: "#e22027", position: "absolute", left: "50%" }} role="status">
                            <span class="visually-hidden"></span>
                        </div>
                    ) :
                        (
                            <Tbody id="manage-assignment-main-tbody-id">

                                {
                                    reportList.map((item, index) =>
                                    (
                                        <Tr key={item.name.replaceAll(" ", "") + index}
                                            id={item.name.replaceAll(" ", "") + index} >
                                            <Td>{item.name}</Td>
                                            <Td>{item.total}</Td>
                                            <Td>{item.assigned}</Td>
                                            <Td>{item.available}</Td>
                                            <Td>{item.notAvailable}</Td>
                                            <Td>{item.waitingForRecycled}</Td>
                                            <Td>{item.recycled}</Td>

                                        </Tr>
                                    )
                                    )
                                }
                            </Tbody>

                        )
                }
            </Table>

            <ReactPaginate
                initialPage={0}
                forcePage={pageNo}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={totalPage}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtn"}
                nextClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </Container>

    )

}
export default Report