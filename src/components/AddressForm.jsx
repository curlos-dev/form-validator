import { useEffect, useState } from 'react'
import { Address, AddressValidator } from "../utils/address.model"
import { InputField } from "./InputField"
import { testAccounts } from '../utils/testAccounts'
import { AddressTwoInputField } from './AddressTwoInputField'

const BASE_FIELD_STATE = {
    value: '',
    valid: false,
    message: ''

}

const AddressForm = () => {
    const [email, setEmail] = useState(BASE_FIELD_STATE)
    const [phone, setPhone] = useState(BASE_FIELD_STATE)
    const [firstName, setFirstName] = useState(BASE_FIELD_STATE)
    const [lastName, setLastName] = useState(BASE_FIELD_STATE)
    const [addressOne, setAddressOne] = useState(BASE_FIELD_STATE)
    const [unitType, setUnitType] = useState('')
    const [unitValue, setUnitValue] = useState('')
    const [addressTwo, setAddressTwo] = useState(BASE_FIELD_STATE)
    const [addressThree, setAddressThree] = useState(BASE_FIELD_STATE)
    const [city, setCity] = useState(BASE_FIELD_STATE)
    const [region, setRegion] = useState(BASE_FIELD_STATE)
    const [postalCode, setPostalCode] = useState(BASE_FIELD_STATE)
    
    const addressValidator = new AddressValidator()
    const addressFieldsToValidate = addressValidator.addressFieldsToValidate

    const addressFields = {
        FirstName: {
            title: 'First Name',
            value: firstName,
            setValue: setFirstName
        },
        LastName: {
            title: 'Last Name',
            value: lastName,
            setValue: setLastName
        },
        Address1: {
            title: 'Address 1',
            value: addressOne,
            setValue: setAddressOne
        },
        Address3: {
            title: 'Address 3',
            value: addressThree,
            setValue: setAddressThree
        },
        City: {
            title: 'City',
            value: city,
            setValue: setCity
        },
        Region: {
            title: 'State',
            value: region,
            setValue: setRegion
        },
        PostalCode: {
            title: 'Postal Code',
            value: postalCode,
            setValue: setPostalCode
        },
        Email: {
            title: 'Email Address',
            value: email,
            setValue: setEmail
        },
        Phone: {
            title: 'Phone Number',
            value: phone,
            setValue: setPhone
        }
    }

    const addressTwoFields = {
        UnitType: {
            value: unitType,
            setValue: setUnitType
        },
        UnitValue: {
            value: unitValue,
            setValue: setUnitValue
        },
        Address2: {
            title: 'Address 2 / Apt / Suite',
            value: addressTwo,
            setValue: setAddressTwo
        }
    }

    const getAllFields = () => {
        return Object.keys(addressFields).map((fieldKey) => {

            return {
                [fieldKey]: addressFields[fieldKey].value
            }
        })
    }

    const testFields = () => {
        for (let fieldKey of Object.keys(testAccounts[0])) {
            const fieldName = fieldKey
            const fieldValue = testAccounts[0][fieldKey]
            console.log(fieldName, fieldValue)
            handleFieldChange(fieldName, fieldValue)
        }

        const allFields = getAllFields()

        console.log(allFields)
    }

    const handleAddressFormSubmit = (event) => {
        event.preventDefault()

        for (let fieldKey of Object.keys(addressFields)) {
            const fieldName = fieldKey
            const fieldValue = addressFields[fieldKey].value.value
            console.log(fieldName, fieldValue)
            handleFieldChange(fieldName, fieldValue)
        }

        const allFields = getAllFields()

        console.log(allFields)
    }
    
    const handleFieldChange = (fieldName, fieldValue) => {
        /*
            @param {string} = fieldName - Name of the field (such as "FirstName", "Email", "")
        */
        const validateField = addressFieldsToValidate[fieldName]
        const validatedField = validateField(fieldValue)

        addressFields[fieldName].setValue({
            ...addressFields[fieldName].value,
            ...validatedField,
            value: fieldValue
            
        })
    }

    // console.log(addressTwoFields)
    // console.log([addressTwoFields.Address2.value.value])
    // console.log([addressTwoFields.Address2.value.message])

    // const customerAddress = new Address({
    //     FirstName: firstName.value,
    //     LastName: lastName.value,
    //     Address1: addressOne.value,
    //     Address2: addressTwo.value,
    //     City: city.value,
    //     Region: region.value,
    //     PostalCode: postalCode.value,
    //     Email: email.value,
    //     Phone: phone.value,
    //   })

    //   console.log(customerAddress)


    return (
        <form onSubmit={handleAddressFormSubmit} className="2xl:mx-48 lg:mx-24 sm:mx-8 rounded-lg p-5 bg-sky-100">
            <h3 className="text-sky-700 font-bold text-xl mb-3">Address</h3>

            <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2 grid-cols">
                    <InputField type={'email'} title={addressFields['Email'].title} name={'Email'} handleFieldChange={handleFieldChange} field={email} />

                    <InputField type={'tel'} title={addressFields['Phone'].title} name={'Phone'} handleFieldChange={handleFieldChange} field={phone} />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2 grid-cols">
                    <InputField type={'text'} title={addressFields['FirstName'].title} name={'FirstName'} handleFieldChange={handleFieldChange} field={firstName} />

                    <InputField type={'text'} title={addressFields['LastName'].title} name={'LastName'} handleFieldChange={handleFieldChange} field={lastName} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 grid-cols">
                    <InputField type={'text'} title={addressFields['Address1'].title} name={'Address1'} handleFieldChange={handleFieldChange} field={addressOne} />

                    <AddressTwoInputField type={'text'} title={addressTwoFields['Address2'].title} addressTwoFields={addressTwoFields} addressFieldsToValidate={addressFieldsToValidate} />
                </div>

                <div className="grid gap-4 sm:grid-cols-3 grid-cols">
                    <InputField type={'text'} title={addressFields['City'].title} name={'City'} handleFieldChange={handleFieldChange} field={city} />

                    <InputField type={'text'} title={addressFields['Region'].title} name={'Region'} handleFieldChange={handleFieldChange} field={region} />

                    <InputField type={'text'} title={addressFields['PostalCode'].title} name={'PostalCode'} handleFieldChange={handleFieldChange} field={postalCode} />
                </div>
            </div>

            <button type="submit" className="bg-sky-600 text-white rounded-lg p-2 mt-10 w-full hover:bg-sky-700 active:opacity-70">
                Validate
            </button>
        </form>
    )
}

export default AddressForm