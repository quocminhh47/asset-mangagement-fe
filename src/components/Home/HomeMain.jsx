import styled from "styled-components";
import "../../css/main.css";
import { useEffect, useRef, useState } from "react";
import { ReplayOutlined, CloseOutlined, CheckOutlined } from "@mui/icons-material";
import axios from "axios";
import Modal from "./Modal";
import Toast from "./Toast";
import {
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
} from '@mui/icons-material';
import AssignmentService from "../../service/AssignmentService";
import DateFormatterService from "../../service/DateFormatterService";
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
    color: var(--color-primary);
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

// Tìm kiếm
const SearchWrapper = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 12%;
    left: 57%;
    box-shadow: var(--box-shadow);
    &.active {
        box-shadow: none;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 42px;
    padding: 0px 50px 0 20px;
    border-radius: 5px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-dark);
`;

const Button = styled.button`
    width: 30px;
    height: 30px;
    padding: 0px;
    outline: none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
`;

const ButtonDelete = styled.button`
width: 30px;
height: 30px;
padding: 0px;
outline: none;
background-color: transparent;
z-index: 2;
cursor: pointer;
    color: var(--color-danger);
`;

const ButtonClick = styled.button`
    min-width: 80px;
    padding: 10px;
    border: 2px solid #868e95;
    background-color: #fff;
    color: #868e95;
    cursor: pointer;
    font-weight: 500;
    border-radius: 5px;
    &.active {
        background-color: var(--color-primary);
        border: 2px solid var(--color-primary);
        color: #fff;
    }
 
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    height: 43px;
    width: 250px;
`;

const FilterTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-radius: 5px;
`;

const FilterSpan = styled.span`
    display: block;
    min-width: 175px;
    padding: 10px 0px 10px 20px;
`;
const FilterUl = styled.ul`
    background-color: #f5f5f5;
    position: absolute;
    top: 43px;
    left: 0px;
    width: 100%;
    max-height: 240px;
    overflow-y: auto;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 10;
`;
const FilterLi = styled.li`
    padding-left: 20px;
`;
const FilterCheckbox = styled.input`
    accent-color: red;
`;

const Filter = styled.div`
    margin: 20px;
    display: flex;
    border: 1px solid #333;
    border-radius: 5px;
`;

const FilterIcon = styled.div`
    border-left: 1px solid #b5b5b5;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Select = styled.select`
    border-radius: 5px;
    padding: 10px;
`;

const Option = styled.option``;

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: auto;
    padding-left: 29px;
`;

const RightOption = styled.div`
    display: flex;
    flex-direction: row;
`;

const SearchContainer = styled.div`
    // margin: 20px;
    display: flex;
    border: 1px solid #dadada;
    border-radius: 5px;
`;

const SearchIcon = styled.div`
    border-left: 1px solid #dadada;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: auto;
`;

const AddContainer = styled.div`
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
`;

const Item = styled.div`
    width: 174px;
    height: 40px;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem var(--card-padding);
    border-radius: 5px;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &.add-product {
        background-color: transparent;
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary);
        color: white;
        cursor: pointer;
        & div {
            display: flex;
            justify-items: center;
            gap: 0.6rem;
        }
    }
`;

const Th = styled.th`
    border-bottom: 1px solid #34383c;
    min-width: 120px;
    color: #34383c;
`;
const ThButton = styled.th`
    min-width: 30px;
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

const PictureNoResultFound = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Img = styled.img`
width: 500px;
max-height: 600px;
object-fit: cover;
`

const H1NoResultFound = styled.h1`
letter-spacing: 2px;
font-size: 1.3rem;
color: var(--color-primary);
`

const ButtonFix = styled.button`
    width: 30px;
    height: 30px;
    border: 2px solid var(--color-warning);
    border-radius: var(--border-radius-2);
    color: var(--color-warnning);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
    
`

const ButtonInfo = styled.button`
    width: 30px;
    height: 30px;
    padding: 0px;
    outline: none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
    color: #576be3;
`

const HomeMain = ({ reRenderData, setReRenderData }) => {
    const InputRef = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [timkiem, setTimKiem] = useState("");

    //sort State
    const [sortBy, setSortBy] = useState("");
    const [isSortAssetCode, setIsSortAssetCode] = useState(true);
    const [isSortAssetName, setIsSortAssetName] = useState(false);
    const [isSortCategory, setIsSortCategory] = useState(false);
    const [isSortAssignedDate, setIsSortAssignedDate] = useState(false);
    const [isSortState, setIsSortState] = useState(false);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [danhMucModal, setDanhMucModal] = useState(null);

    // User
    const userStaffCode = JSON.parse(localStorage.getItem('user_info')).id;
    const [assignmentList, setAssignmentList] = useState([]);

    // Reload page
    const [isReloadPage, setIsReloadPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSeach = (e) => {
        if (isSearch === false) {
            setIsSearch(!isSearch);
            e.preventDefault();
        } else {
            // Thực hiện tìm kiếm
        }
    }
    const handleClose = () => {
        setIsSearch(false);
        InputRef.current.value = "";
        setTimKiem("");
    }

    useEffect(() => {
        setIsLoading(true);
        const getAssignmentList = async () => {
            const result = await AssignmentService.getAssignment(userStaffCode, 'asset.code', 'ASC').catch((error) => console.log(error));
            setAssignmentList(result.data);
            setIsLoading(false);
            return result.data;
        };
        getAssignmentList();
    }, [isReloadPage])

    //Change 
    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.assignment);
    }

    const handleSortAssetCode = (sort) => {

        setIsSortAssetCode(prev => !prev)
        sortAssignment(sort, isSortAssetCode ? 'DESC' : 'ASC');
    }

    const handleSortAssetName = (sort) => {

        setIsSortAssetName(prev => !prev)
        sortAssignment(sort, isSortAssetName ? 'DESC' : 'ASC');
    }

    const handleSortCategory = (sort) => {

        setIsSortCategory(prev => !prev)

        sortAssignment(sort, isSortCategory ? 'DESC' : 'ASC');
    }

    const handleSortAssignedDate = (sort) => {
        setIsSortAssignedDate(prev => !prev)
        sortAssignment(sort, isSortAssignedDate ? 'DESC' : 'ASC');
    }

    const handleSortState = (sort) => {

        setIsSortState(prev => !prev)
        sortAssignment(sort, isSortState ? 'DESC' : 'ASC');
    }

    const sortAssignment = (sortBy, sortDirection) => {
        setIsLoading(true);
        const getAssignmentList = async () => {
            const result = await AssignmentService.getAssignment(userStaffCode, sortBy, sortDirection).catch((error) => console.log(error));
            setAssignmentList(result.data);
            setIsLoading(false);
        }
        getAssignmentList();
    }

    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({ message: "alo alo", type: "success" });
    const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
    // bằng các dom event, javascript, ...

    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    }

    return (
        <Container id='assignment-list'>
            <RecentOrders>
                <H2 id='assignment-title'>My Assignment</H2>
                {
                    assignmentList.length === 0 ?
                        <PictureNoResultFound id="No_Result_Found_Picture">
                            <Img src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000" alt="Not Found Result" />
                            <H1NoResultFound>Your assignment is empty</H1NoResultFound>
                        </PictureNoResultFound>
                        :
                        <>
                            <Table id='assignment-table'>
                                <Thead id='assignment-thead'>
                                    <Tr id='assignment-thead-tr'>
                                        <Th id="th_sort_container_code">
                                            <ThContainer id="sort_container_code" onClick={() => {
                                                handleSortAssetCode('asset.code')
                                            }}>
                                                <ThSpan>Asset Code</ThSpan>
                                                <ThSortIcon id="sort_by_code">
                                                    {isSortAssetCode ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_name">
                                            <ThContainer id="sort_container_name" onClick={() => {
                                                handleSortAssetName('asset.name')
                                            }}>
                                                <ThSpan>Asset name</ThSpan>
                                                <ThSortIcon id="sort_by_name">
                                                    {isSortAssetName ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_category">
                                            <ThContainer id="sort_container_category" onClick={() => {
                                                handleSortCategory('asset.category.name')
                                            }}>
                                                <ThSpan>Category</ThSpan>
                                                <ThSortIcon id="asset.category.name">
                                                    {isSortCategory ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_date">
                                            <ThContainer id="sort_container_date" onClick={() => {
                                                handleSortAssignedDate('id.assignedDate')
                                            }}>
                                                <ThSpan>Assigned Date</ThSpan>
                                                <ThSortIcon id="sort_by_date">
                                                    {isSortAssignedDate ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_state">
                                            <ThContainer id="sort_container_state" onClick={() => {
                                                handleSortState('state')
                                            }}>
                                                <ThSpan>State</ThSpan>
                                                <ThSortIcon id="sort_by_state">
                                                    {isSortState ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <ThButton id='th-accept-button'></ThButton>
                                        <ThButton id='th-decline-button'></ThButton>
                                        <ThButton id='th-return-button'></ThButton>
                                    </Tr>
                                </Thead>
                                {
                                    isLoading ? (
                                        <div class="spinner-border text-warning" style={{ color: "#e22027", position: "absolute", left: "50%" }} role="status">
                                            <span class="visually-hidden"></span>
                                        </div>
                                    ) :
                                        (
                                            <Tbody id='assignment-body'>
                                                {assignmentList.map((assignmentDetail) =>
                                                    <Tr id='assignment-tbody-tr'>
                                                        <Td id={'asset-code'+ assignmentDetail.assetCode} 
                                                        onClick={() => openModal({ type: "detailAssignment", assignment: assignmentDetail })}>{assignmentDetail.assetCode}</Td>
                                                        <Td id={'asset-name' + assignmentDetail.assetCode}
                                                        onClick={() => openModal({ type: "detailAssignment", assignment: assignmentDetail })}>{assignmentDetail.assetName}</Td>
                                                        <Td id={'category-name' + assignmentDetail.assetCode}
                                                        onClick={() => openModal({ type: "detailAssignment", assignment: assignmentDetail })}>{assignmentDetail.assetCategoryName}</Td>
                                                        <Td id={'assigned-date' + assignmentDetail.assetCode}
                                                        onClick={() => openModal({ type: "detailAssignment", assignment: assignmentDetail })}>{DateFormatterService.dateFormat(assignmentDetail.assignedDate)}</Td>
                                                        <Td id={'state' + assignmentDetail.assetCode}
                                                        onClick={() => openModal({ type: "detailAssignment", assignment: assignmentDetail })}>{assignmentDetail.state}</Td>
                                                        <Td className="danger">
                                                            <ButtonDelete id={"btn-edit-" + assignmentDetail.assetCode}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openModal({ type: "respondAccept", assignment: assignmentDetail });
                                                                }}
                                                                disabled={assignmentDetail.state === 'Waiting for acceptance' ? false : true}>
                                                                <CheckOutlined style={{ color: assignmentDetail.state === 'Waiting for acceptance' ? '' : '#f6b4b8' }} />
                                                            </ButtonDelete>
                                                        </Td>
                                                        <Td className="warning" >
                                                            <Button id={'btn-reject-' + assignmentDetail.assetCode}
                                                                onClick={(e) => {
                                                                    openModal({ type: "respondDecline", assignment: assignmentDetail });

                                                                }}
                                                                disabled={assignmentDetail.state === 'Waiting for acceptance' ? false : true}
                                                            >
                                                                <CloseOutlined style={{ color: assignmentDetail.state === 'Waiting for acceptance' ? '' : '##b1b1b1' }} />
                                                            </Button>
                                                        </Td>
                                                        <Td className="info">
                                                            <ButtonInfo id={'btn-return-' + assignmentDetail.assetCode}
                                                                onClick={(e) => { e.stopPropagation(); openModal({ type: "returningRequest", assignment: assignmentDetail }); }}
                                                                attr
                                                                disabled={assignmentDetail.requestReturningId !== null || assignmentDetail.state === 'Waiting for acceptance' ? true : false}
                                                            >
                                                                <ReplayOutlined style={{ color: assignmentDetail.requestReturningId !== null || assignmentDetail.state === 'Waiting for acceptance' ? '#bcbcbc' : '' }} />
                                                            </ButtonInfo>
                                                        </Td>
                                                    </Tr>
                                                )}
                                            </Tbody>
                                        )
                                }
                            </Table>
                        </>
                }
            </RecentOrders>
            <Modal id='modal_assignment'
                showModal={showModal}   //state Đóng mở modal
                setShowModal={setShowModal} //Hàm Đóng mở modal
                type={typeModal}    //Loại modal
                assignment={danhMucModal}  //Dữ liệu bên trong modal
                setIsReloadPage={setIsReloadPage}   //Hàm rerender khi dữ liệu thay đổi
                handleClose={handleClose}   //Đóng tìm kiếm
                showToastFromOut={showToastFromOut} //Hàm hiện toast
            />

            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
            />
        </Container>
    );
};



export default HomeMain;