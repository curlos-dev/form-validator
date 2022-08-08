export const InputField = ({ type, title, name, value, handleFieldChange, field }) => {
    
    const handleChangeValue = (event) => {
        handleFieldChange(name, event.target.value)
    }
    
    const valid = (field.message.length === 0 || field.valid)

    return (
        <div className="">
            <div className="text-sky-700 font-bold text-base">{title}:</div>
            
            <div className={`flex justify-between rounded-lg p-3 bg-white border ${valid ? 'border-sky-500' : 'border-rose-600 border-b-0 rounded-b-none'}`}>
                <input type={type} className="w-full bg-white focus-visible:outline-none placeholder-gray-400" placeholder={title} value={value} onChange={handleChangeValue} />

                {field.message.length > 0 && (
                    field.valid ? (
                        <img src="/assets/valid.png" alt="Cowboy Hat Smile Emoji" className="h-7" />
                    ) : (
                        <img src="/assets/invalid.png" alt="Cowboy Hat Smile Emoji" className="h-7" />
                    )
                )
                }
                
            </div>

            <div className={`${(valid) ? 'hidden' : 'block'} border rounded-t-none border-t-0 border-rose-600 bg-rose-100 text-rose-600 text-sm p-2`}>
                {field.message}
            </div>

        </div>
    )
}