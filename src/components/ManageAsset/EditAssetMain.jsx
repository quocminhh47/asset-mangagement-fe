import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "../../css/main.css"
import { ArrowDropDownOutlined, CloseOutlined, DoneOutlined } from '@mui/icons-material';
import AssetsService from '../../service/AssetsService';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -150px;
`

const Title = styled.div`
    display: flex;
    width: 100%;
    margin-left: 60%;
`

const H2 = styled.h2`
    color: var(--color-primary);
    margin-bottom: 25px;
    font-size: 1.3rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
`

const FormTitle = styled.div`


`
const FormTitleItem = styled.div`
    min-width: 100px;
    height: 50px;
    font-size: 1.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

`
const FormContent = styled.div`

`
const FormContentItem = styled.div`
    font-size: 1.2rem;
    height: auto;
    min-width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-direction: column;
`

const FormContentItemCheckbox = styled.div`
    display: flex;
    width: 220px;
    margin: 5px 20px;
    padding: 0px 0px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-size: 1.2rem;
`


const Button = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
`

const ButtonContainer = styled.div`
    position: relative;
    float: right;
    margin: 0 22px 22px 0;
`

const ButtonClick = styled.button`
    min-width: 80px;
    padding: 10px;
    border: 2px solid #c0c3c7;
    background-color: #fff;
    color: #c0c3c7;
    cursor: pointer;
    font-weight: 500;
    border-radius: 5px;
    &.active {
        background-color: var(--color-primary);
        border: 2px solid var(--color-primary);
        color: #fff;
    }
`


const InputText = styled.input`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    border: 1px solid #c1c1c1;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }

`
const InputDate = styled.input`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    border: 1px solid #c1c1c1;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
`

const TextArea = styled.textarea`
max-width: 300px;
margin: 5px 20px;
outline: none;
color: #191919;
border-radius: 10px;
padding: 5px 10px 0px 10px;
box-sizing: border-box;
border: 1px solid #c1c1c1;
resize: none;
&::placeholder {
    letter-spacing: 2px;

    font-size: 15px;
}
&:focus {
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
}
`

const InputRadio = styled.input`
    padding: 0px 10px;
    accent-color: red;
`

const InputRadioSpan = styled.span`
    font-size: 1.1rem;
    padding: 0px 10px;
`
const Label = styled.label`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
`

const Error = styled.span`
    margin: 0px 0px 10px 30px;
    font-size: 1.1rem;
    color: red;
`

const CategoryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    height: 43px;
    width: 300px;
`

const CategoryTitle = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
border-radius: 5px;
`

const CategorySpan = styled.span`
    display: block;
    min-width: 260px;
    padding: 10px 0px 10px 20px;
`
const CategoryUl = styled.ul`
background-color: #f5f5f5;
position: absolute;
top: 43px;
left: 0px;
width: 300px;
border: 0;
padding: 0;
z-index: 10;

`
const CategoryLi = styled.li`
    padding: 10px 0px 10px 20px;
    cursor: pointer;
`

const CategoryLiContainer = styled.div`
    max-height: 240px;
    overflow-y: auto;
`

const CategoryIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
`
const AddCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    border: 1px solid #9e9e9e;
    background-color: #f5f5f5;
    position: absolute;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    justify-content: space-around;
    align-items: center;
`

const AddCategoryInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 10px 5px 30px;
`

const CategoryInput = styled.input`
padding-left: 5px;
width: 120px;
border: 1px solid #9e9e9e;
height: 30px;
`

const PreflixInput = styled.input`
padding-left: 5px;
width: 30px;
height: 30px;
border: 1px solid #9e9e9e;
`

const AddCategoryOptionContainer = styled.div`
display:flex;
justify-content: center;
align-items: center;
`

const EditAssetMain = (props) => {
    const [today, setToday] = useState();
    const [id, setId] = useState(props.data.id)
    const [name, setName] = useState(props.data.name)
    const [category, setCategory] = useState(props.data.category)
    const [spec, setSpec] = useState(props.data.spec)
    const [installedDate, setInstalledDate] = useState(() => {
        const date = props.data.installedDate
        if(date.includes("T")) {
          return  props.data.installedDate.split("T")[0]
        }
        else {
            return props.data.installedDate
        }
        
        
    })
    const [state, setState] = useState(props.data.state)
    const [err, setErr] = useState('')
    // console.log(state);
    const navigate = useNavigate()

    useEffect(() => {
        setToday(new Date().toISOString().split("T")[0])
    }, []);

    const handleEditAsset = () => {
        const dataPayload = {
            name: name,
            specification: spec,
            installedDate: installedDate,
            state: state
        }
        // console.log(dataPayload);
        AssetsService.editAsset(dataPayload, id)
            .then(res => {
                // console.log(res.data);
                const savedAsset = {
                    assetCode: res.data.code,
                    assetName: res.data.name,
                    categoryName: res.data.categoryName,
                    state: res.data.state,
                    installedDate : res.data.installedDate,
                    locationCode : res.data.locationCode,
                    specification : res.data.specification
                }
                localStorage.setItem("assetSaved", JSON.stringify(savedAsset))
                navigate("/manage-asset")
            })
            .catch(err => {
                console.log(err)
                const errValidation = err.response.data
                if (errValidation.message) {
                    setErr("Installed " + errValidation.message.replaceAll(".", " "))
                }
                else setErr("Failed, try again!")
            })
    }

    return (
        <Container>
            <Title>
                <H2>Edit Asset</H2>
            </Title>
            <span style={{ color: "red" }}>{err}</span>
            <br />
            <Form>
                <FormTitle>
                    <FormTitleItem>Name</FormTitleItem>
                    <FormTitleItem>Category</FormTitleItem>
                    <FormTitleItem>Specification</FormTitleItem>
                    <FormTitleItem style={{ marginTop: "15px" }}>Installed Date</FormTitleItem>
                    <FormTitleItem>State</FormTitleItem>
                </FormTitle>
                <FormContent>

                    <FormContentItem>
                        <InputText id="assetName-filed" className='borderPrimary'
                            value={name ? name : ''}
                                   maxLength={100}
                                   onChange={(e) => setName(e.target.value)}
                        ></InputText>
                    </FormContentItem>

                    <CategoryContainer id="assetCategory-field"
                        className="dropdown-check-list-create-asset"
                        tabindex="100" style={{ margin: "5px 20px", backgroundColor: "#eff1f5" }}>
                        <CategoryTitle className="anchor-create-asset" >
                            <CategorySpan>{category ? category : ''}</CategorySpan>
                            <CategoryIcon>
                                <ArrowDropDownOutlined />
                            </CategoryIcon>
                        </CategoryTitle>
                    </CategoryContainer>

                    <FormContentItem>
                        <TextArea id='assetSpec-field' rows="3" cols="46"
                            onChange={(e) => setSpec(e.target.value)}
                                  maxLength={200}
                                  className='borderPrimary' value={spec ? spec : ''}></TextArea>
                    </FormContentItem>

                    <FormContentItem>
                        <InputDate id='installedDate-field' type="date" max={today}
                            onChange={(e) => {
                                setErr('')
                                setInstalledDate(e.target.value)
                            }}
                            className="borderPrimary" value={installedDate ? installedDate : ''}></InputDate>
                    </FormContentItem>

                    <FormContentItemCheckbox id="editAsset_Radio" onChange={(e) => {
                        setState(e.target.value)
                        // console.log(e.target.value)
                    }}>
                        <Label id='editAsset_RadioAvailable'>
                            <InputRadio id="radioAvailable" type="radio" name="radio_Available"
                                checked={state === "AVAILABLE"} value="AVAILABLE" />
                            <InputRadioSpan>Available</InputRadioSpan>
                        </Label>
                        <Label id='editAsset_RadioNotAvailable'>
                            <InputRadio id="radioNotAvailable" type="radio" name="radio_NotAvailable"
                                checked={state === "NOT_AVAILABLE"} value="NOT_AVAILABLE" />
                            <InputRadioSpan>Not Available</InputRadioSpan>
                        </Label>

                        <Label id='editAsset_RadioWaiting4Recycled'>
                            <InputRadio id="radioWaiting4Recycled" type="radio" name="radio_Waiting4Recycled"
                                checked={state === "WAITING_FOR_RECYCLED"} value="WAITING_FOR_RECYCLED" />
                            <InputRadioSpan>Waiting for recycling</InputRadioSpan>
                        </Label>

                        <Label id='editAsset_RadioRecycled'>
                            <InputRadio id="radioRecycled" type="radio" name="radio_Recycled"
                                checked={state === "RECYCLED"} value="RECYCLED" />
                            <InputRadioSpan>Recycled</InputRadioSpan>
                        </Label>
                    </FormContentItemCheckbox>

                    <Button>
                        <ButtonContainer>
                            <button
                                id="btnSave"
                                type="button"
                                className={'btn btn-login btn-danger btn-lg '
                                    + (state != "ASSIGNED" && name && category && spec && installedDate && state ? '' : 'disabled')
                                }

                                style={{ fontSize: "1rem" }}
                                onClick={() => handleEditAsset()}
                            >
                                Save
                            </button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonClick
                                id='btnCancel'
                                onClick={() => navigate("/manage-asset")}
                            >Cancel</ButtonClick>
                        </ButtonContainer>
                    </Button>

                </FormContent>
            </Form>
        </Container>
    )
}

export default EditAssetMain