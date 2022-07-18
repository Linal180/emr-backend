import * as  moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as bcryptjs from 'bcryptjs';
import { HttpException, HttpStatus } from "@nestjs/common";
//user imports
import { ContactType } from "src/providers/entities/contact.entity";
import { FormElement } from 'src/formbuilder/entities/form-elements.entity';
import { UsersFormsElements } from 'src/formbuilder/entities/userFormElements.entity';
import { UserFormElementInputs } from 'src/formbuilder/dto/userFormElements.input';


export function createToken(): string {
  return uuidv4();
}

export async function createPasswordHash(password: string): Promise<string> {
  return await bcryptjs.hash(password, await bcryptjs.genSalt());
}

export const mediaFilesFilter = (_req, file, callback) => {
  if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|mp3)$/)) {
    return callback(new HttpException('Only jpeg|jpg|png|svg|mp3 files are allowed', HttpStatus.FORBIDDEN), false);
  }
  callback(null, true);
}

export const mediaFilesInter = (_req, file, callback) => {
  if (file && !file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|mp3)$/)) {
    return callback(new HttpException('Only jpeg|jpg|png|svg|mp3 files are allowed', HttpStatus.FORBIDDEN), false);
  }
  callback(null, true);
}


export const paginateResponse = (data, page, limit) => {
  const [result, total] = data;
  const totalPages = Math.ceil(total / limit);

  return {
    statusCode: 'success',
    data: [...result],
    totalCount: total,
    totalPages,
    page
  }
}

export const getYearDate = (year: number) => {
  const date = new Date().setFullYear(year)
  const startDate = moment(date).startOf('year').format('YYYY-MM-DD')
  const endDate = moment(date).endOf('year').format('YYYY-MM-DD')

  return {
    startDate,
    endDate
  }
}

export const Months = [
  { id: 0, name: "JAN" },
  { id: 1, name: "FEB" },
  { id: 2, name: "MAR" },
  { id: 3, name: "APR" },
  { id: 4, name: "MAY" },
  { id: 5, name: "JUN" },
  { id: 6, name: "JUL" },
  { id: 7, name: "AUG" },
  { id: 8, name: "SEP" },
  { id: 9, name: "OCT" },
  { id: 10, name: "NOV" },
  { id: 11, name: "DEC" },
]

export const getMonthsRecord = (arr: any[]) => {
  return Months?.map(({ id, name }) => {
    const monthData = arr?.filter(({ createdAt }) => {
      const month = new Date(createdAt).getMonth()
      return month === id
    })

    return { id, count: monthData?.length, name }
  })
}


export const getUserElementValue = (usersFormsElements: UsersFormsElements[], formElement: FormElement[]) => {
  const obj = {}
  formElement?.map(({ columnName, fieldId }) => {
    const element = usersFormsElements?.find(({ FormsElementsId }) => fieldId === FormsElementsId);
    if (element) {
      const { value } = element
      return obj[columnName] = value
    }
  })
  return obj
}

export const pluckFormElementId = (arr: FormElement[],) => {
  return arr?.map(({ fieldId }) => fieldId)
}

export const getTableElements = (formElements: FormElement[], table: string, tableContactT?: ContactType) => {
  return formElements?.filter(({ tableName, tableContactType }) => {
    if (tableContactT) {
      return tableName === table && tableContactType === tableContactT
    }
    return tableName === table
  })
}

export const getUserFormElements = (userFormElements: UsersFormsElements[], formElements: string[]) => {
  return userFormElements?.filter(({ FormsElementsId }) => formElements?.includes(FormsElementsId))
}

export const getCustomElementValue = (userFormElementInputs: UserFormElementInputs[], formElement: string) => {
  const element = userFormElementInputs?.find(({ FormsElementsId }) => FormsElementsId === formElement)
  if (element) {
    const { value } = element;
    return value
  }
  return null
}


export const getMutationType = (operationName: string) => {

  if (operationName?.includes('create') || operationName?.includes('Create')) {
    return 'Create'
  }

  else if (operationName?.includes('update') || operationName?.includes('Update')) {
    return 'Update'
  }

  else if (operationName?.includes('remove') || operationName?.includes('Remove')) {
    return 'Delete'
  }

  return operationName
}

export const getOperationType = (type: string, operationName: string) => {

  switch (type) {

    case 'Query':
      return 'Read';

    case 'Mutation':
      return getMutationType(operationName)

    default:
      return ''
  }

}

export const getClaimGender = (gender: string) => {
  switch (gender) {
    case 'Identifies as Male':
      return 'M'
    case 'Identifies as Female':
      return 'F'
    default:
      return 'U'
  }
}

export const getClaimRelation = (relation: string) => {
  switch (relation) {
    case 'Spouse':
      return '01'
    case 'Self':
      return '18'
    case 'Child':
      return '19'
    case 'Employee':
      return '20'
    case 'Unknown':
      return '21'
    case 'Organ Donor':
      return '39'
    case 'Cadaver Donor':
      return '40'
    case 'Life Partner':
      return '53'
    default:
      return 'G8'
  }
}

export const getYesOrNo = (value: boolean) => {
  return value ? 'Y' : 'N'
}

export const generateString = (numberOfRounds = 2) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = characters.length - 2;
  for (let i = 0; i < numberOfRounds; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result + Math.floor(100000 + Math.random() * 9000);
}