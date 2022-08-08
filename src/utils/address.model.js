const unitTypes = [{
    value: "",
    content: "Unit_Type"
  }, {
    value: "APT",
    content: "APT"
  }, {
    value: "UNIT",
    content: "UNIT"
  }, {
    value: "RM",
    content: "ROOM"
  }, {
    value: "TRLR",
    content: "TRAILER"
  }, {
    value: "STE",
    content: "SUITE"
  }, {
    value: "LOT",
    content: "LOT"
  }, {
    value: "FL",
    content: "FLOOR"
  }, {
    value: "FRNT",
    content: "FRONT"
  }, {
    value: "BACK",
    content: "BACK"
  }, {
    value: "UPR",
    content: "UPPER"
  }, {
    value: "LOWR",
    content: "LOWER"
  }, {
    value: "BOX",
    content: "BOX"
  }, {
    value: "OTHER",
    content: "OTHER"
  }
]
  
const staticValues = {}
staticValues.unitTypes = unitTypes

class Address {
  constructor(AddressObject) {
    const {
      FirstName, 
      LastName, 
      UnitType, 
      UnitValue, 
      Address1, 
      Address2, 
      Address3, 
      City, 
      Region, 
      PostalCode, 
      Email, 
      Phone
    } = AddressObject

    this.FirstName = FirstName ? FirstName : ''; // 3 < FirstName.length <= 25 characters, only letters (A-Z, a-z), apostrophes
    this.LastName = LastName ? LastName : ''; // 3 < LastName.length <= 25, only letters (A-Z, a-z), apostrophes
    this.Address1 = Address1 ? Address1 : ''; // 3 < Address1.length <= 60, [A-Z][0-9]
    this.Address2 = Address2 ? Address2 : ''; // 3 < Address2.length <= 10, [A-Z][0-9] (May have to increase from 10)
    this.Address3 = Address3 ? Address3 : ''; // 3 < Address3.length <= 10, [A-Z][0-9] (May have to increase from 10)
    this.City = City ? City : ''; // 3 < City.length <= 35, [A-Z]
    this.Region = Region ? Region : ''; // Region.length === 2, [A-Z]
    this.PostalCode = ''; // PostalCode.length === 5, [0-9]
    this.Email = Email ? Email : ''; // @._-
    this.Phone = Phone ? Phone : ''; // Phone.Length === 10, Cannot start with a 0 or a 1 [0-9]

    this.Address1 = Address1.trim()
    this.UnitType = UnitType;
    this.UnitValue = UnitValue;
    this._postalCode = PostalCode;

    this._Address2 = {
      UnitType,
      UnitValue
    };

    this._unit = Address2;
    this.AddressValidator = new AddressValidator()
    this.validatedFields = this.AddressValidator.validateAllFields(AddressObject)
  }

  set _postalCode(postalCode) {
    if (!postalCode) return;


    if (postalCode.indexOf("-") !== -1) {
      this.PostalCode = postalCode.split("-")[0].trim();
      this.PostalCode = this.PostalCode.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
      return;
    }

    this.PostalCode = postalCode;
  }

  set _unit(Address2) {
    if (!Address2) return;
    const UnitType = staticValues.unitTypes.find((unit) => {
      if (unit.value !== "") return Address2.indexOf(unit.value) !== -1;
    });
    this.UnitType = UnitType ? UnitType.value : "OTHER";
    this.UnitValue =
      this.UnitType === "OTHER" ? Address2 : Address2.split(" ")[1].trim();
  }

  set _Address2({
    UnitType,
    UnitValue
  }) {
    if (!this.UnitType && this.UnitValue) return;

    if (this.UnitType === "OTHER") {
      this.Address2 = this.UnitValue;
      return;
    }
    this.Address2 = `${this.UnitType} ${this.UnitValue}`;
  }


}

class AddressValidator {
  constructor() {
    this.addressFieldsToValidate = {
      FirstName: this.validateName,
      LastName: this.validateName,
      Address1: this.validateAddress1,
      Address2: this.validateAddress2,
      Address3: this.validateAddress3,
      City: this.validateCity,
      Region: this.validateRegion,
      PostalCode: this.validatePostalCode,
      Email: this.validateEmail,
      Phone: this.validatePhone
    }
  }

  validateAllFields(addressObject) {
    const validatedFields = {}

    for (let field of Object.keys(addressObject)) {

      if (this.addressFieldsToValidate[field]) {
        const validatedResult = this.addressFieldsToValidate[field](addressObject[field])

        validatedFields[field] = validatedResult
      }
    }

    return validatedFields
  }

  validateName(name) {
    // 3 < name.length <= 25 characters, only letters (A-Z, a-z), apostrophes
    if (name.length < 3 || name.length > 25) {
      return {
        valid: false,
        message: "Name must be between 3 and 25 characters in length!"
      }
    }

    const regex = /[a-zA-Z]+$/
    const valid = regex.test(name)

    if (!valid) {
      return {
        valid: false,
        message: "Name must only be alphabetical letters!"
      }
    } else {
      return {
        valid: true
      }
    }
  }

  validateAddress1(address1) {
    // 3 < address1.length <= 60, [A-Z][0-9]
    if (address1.length < 3 || address1.length > 60) {
      return {
        valid: false,
        message: "Address1 must be between 3 and 60 characters in length!"
      }
    }

    const regex = /^\d+\s[A-z]+\s.*$/
    const valid = regex.test(address1)


    if (!valid) {
      return {
        valid: false,
        message: "Address1 must only be alphanumeric characters and have at least two spaces!"
      }
    } else {
      return {
        valid: true
      }
    }
  }

  validateAddress2(address2) {
    // 3 < address2.length <= 10, [A-Z][0-9] (May have to increase from 10)
    if (address2.length < 3 || address2.length > 10) {
      return {
        valid: false,
        message: "Address2 must be between 3 and 10 characters in length!"
      }
    }

    const regex = /^[a-zA-Z0-9_]*/
    const valid = regex.test(address2)

    if (!valid) {
      return {
        valid: false,
        message: "Address2 must only be alphanumeric characters!"
      }
    } else {
      const { unitType, unitValue } = getUnitTypeAndValue(address2)


      return {
        valid: true
      }
    }
  }

  validateAddress3(address3) {
    // 3 < address3.length <= 10, [A-Z][0-9] (May have to increase from 10)
    if (address3.length < 3 || address3.length > 10) {
      return {
        valid: false,
        message: "Address3 must be between 3 and 10 characters in length!"
      }
    }

    const regex = /^[a-zA-Z0-9_]*$/
    const valid = regex.test(address3)


    if (!valid) {
      return {
        valid: false,
        message: "Address3 must only be alphanumeric characters!"
      }
    } else {
      return {
        valid: true
      }
    }
  }

  validateCity(city) {
    // 3 < city.length <= 35, [A-Z]
    if (city.length < 3 || city.length > 35) {
      return {
        valid: false,
        message: "City must be between 3 and 35 characters in length!"
      }
    }

    const regex = /^\D*$/
    const valid = regex.test(city)


    if (!valid) {
      return {
        valid: false,
        message: "City must only be alphabetical letters!"
      }
    } else {
      return {
        valid: true
      }
    }
  }

  validateRegion(region) {
    // region.length === 2, [A-Z]
    if (region.length !== 2) {
      return {
        valid: false,
        message: "Region must be 2 characters long!"
      }
    }

    const regex = /[a-zA-Z]+$/
    const valid = regex.test(region)


    if (!valid) {
      return {
        valid: false,
        message: "Region must only be alphabetical letters!"
      }
    } else {
      return {
        valid: true
      }
    }
  }

  validatePostalCode(postalCode) {
    // postalCode.length === 5, [0-9]

    if (!(/[0-9]+$/.test(postalCode))) {
      return {
        valid: false,
        message: "Postal Code must only contain numbers!"
      }
    }

    if (postalCode.length !== 5) {
      return {
        valid: false,
        message: "Postal Code must be 5 digits!"
      }
    }

    const regex = /^\s*?\d{5}(?:[-\s]\d{4})?\s*?$/
    const valid = regex.test(postalCode)


    if (!valid) {
      return {
        valid: false,
        message: "Postal Code must only contain numbers!"
      }
    } else {
      return {
        valid: true
      }
    }
  }

  validateEmail(email) {
    const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    const valid = regex.test(email)


    if (!valid) {
      return {
        valid: false,
        message: "Email Address is not valid!"
      }
    } else {
      return {
        valid: true
      }
    }
  }

  validatePhone(phone) {
    // Phone.Length === 10, Cannot start with a 0 or a 1 [0-9]

    if (phone.length !== 10) {
      return {
        valid: false,
        message: "Phone number must be 10 digits!"
      }
    }

    if (['0', '1'].includes(phone[0])) {
      return {
        valid: false,
        message: 'Phone number cannot start with a 0 or a 1!'
      }
    }

    const regex = /[0-9]+$/
    const valid = regex.test(phone)


    if (!valid) {
      return {
        valid: false,
        message: "Phone number is not valid!"
      }
    }

    return {
      valid: true
    }
  }
  
  
}

const addressObject = {
  FirstName: "Ma",
  LastName: "Spidermantest",
  Address1: "1103 PORT ST",
  Address2: "APT 201",
  City: "NEW ORLEANS",
  Region: "LA",
  PostalCode: "70117",
  Email: "marc+080422.03@qlink.com",
  Phone: "5616269531",
}

function getUnitTypeAndValue(address2) {
  let unitType = '';
  let unitValue = '';
  const splitAddressArr = address2.trim().split(' ')

  const regex = /[0-9]/
  console.log(splitAddressArr)

  if (splitAddressArr.length === 2) {
    unitType = splitAddressArr[0]
    unitValue = splitAddressArr[1]
  } else {
    for (let i = 0; i < address2.length; i++) {
      const char = address2[i]
      const isNum = regex.test(char)

      if (isNum) {
        unitType = address2.slice(0, i).trim()
        unitValue = address2.slice(i, address2.length).trim()
        break
      }

      if (i === address2.length - 1) {
        unitType = address2
      }
    }
  }

  return { unitType, unitValue }
}


export {
  Address,
  AddressValidator
}