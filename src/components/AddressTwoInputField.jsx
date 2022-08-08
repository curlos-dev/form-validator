export const AddressTwoInputField = ({ type, title, addressTwoFields, addressFieldsToValidate }) => {

    const addressTwoField = addressTwoFields['Address2'].value
    
    const changeUnitType = (event) => {
        const unitType = event.target.value
        const unitValue = addressTwoFields['UnitValue'].value
        let addressTwoValue = ''

        if (unitType) {
            addressTwoValue += unitType
        }

        if (unitValue) {
            if (unitType) {
                addressTwoValue += ' '
            }
            addressTwoValue += unitValue
        }

        const validateField = addressFieldsToValidate['Address2']
        const validatedField = validateField(addressTwoValue)
        
        addressTwoFields['UnitType'].setValue(unitType)
        addressTwoFields['Address2'].setValue({
            ...addressTwoField,
            ...validatedField,
            value: addressTwoValue
        })
    }

    const changeUnitValue = (event) => {
        const unitType = addressTwoFields['UnitType'].value
        const unitValue = event.target.value
        let addressTwoValue = ''

        if (unitType) {
            addressTwoValue += unitType
        }

        if (unitValue) {
            addressTwoValue += ` ${unitValue}`
        }

        console.log(addressTwoValue)
        

        const validateField = addressFieldsToValidate['Address2']
        const validatedField = validateField(addressTwoValue)
        
        addressTwoFields['UnitValue'].setValue(unitValue)
        addressTwoFields['Address2'].setValue({
            ...addressTwoField,
            ...validatedField,
            value: addressTwoValue
        })
    }
    
    const valid = (addressTwoField.message.length === 0 || addressTwoField.valid)

    return (
        <div className="">
            <div className="text-sky-700 font-bold text-base">{title}:</div>

            <div className="grid grid-cols-2">
                <select autoComplete="address-line2" name="unit" className={`mr-5 rounded-lg border border-sky-500 px-3 ${valid ? 'border-sky-500' : 'border-rose-600 border-b-0 rounded-b-none'}`} onChange={changeUnitType}>
                    <option value="">Select</option>
                    <option value="APT">APT</option>
                    <option value="UNIT">UNIT</option>
                    <option value="Room">Room</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Suite">Suite</option>
                    <option value="Lot">Lot</option>
                    <option value="Floor">Floor</option>
                    <option value="Front">Front</option>
                    <option value="Back">Back</option>
                    <option value="Lower">Lower</option>
                    <option value="Upper">Upper</option>
                    <option value="Box">Box</option>
                    <option value="Other">Other</option>
                </select>
                
                <div>
                    <div className={`flex justify-between rounded-lg p-3 bg-white border ${valid ? 'border-sky-500' : 'border-rose-600 border-b-0 rounded-b-none'}`}>
                        <input type={type} className="w-full bg-white focus-visible:outline-none placeholder-gray-400" placeholder={title} value={addressTwoFields['UnitValue'].value} onChange={changeUnitValue} />

                        {addressTwoField.message.length > 0 && (
                            addressTwoField.valid ? (
                                <img src="/assets/valid.png" alt="Cowboy Hat Smile Emoji" className="h-7" />
                            ) : (
                                <img src="/assets/invalid.png" alt="Cowboy Hat Smile Emoji" className="h-7" />
                            )
                        )}
                        
                    </div>
                </div>
            </div>

            <div className={`${(valid) ? 'hidden' : 'block'} border rounded-t-none border-t-0 border-rose-600 bg-rose-100 text-rose-600 text-sm p-2`}>
                {addressTwoField.message}
            </div>

        </div>
    )
}