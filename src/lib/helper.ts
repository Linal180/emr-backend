import * as  moment from 'moment';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from "@nestjs/common";


export function createToken(): string {
  return uuidv4();
}

export async function createPasswordHash(password: string): Promise<string> {
  return await bcrypt.hash(password, await bcrypt.genSalt());
}

export const mediaFilesFilter = (_req, file, callback) => {
  if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx)$/)) {
    return callback(new HttpException('Only jpeg|jpg|png|svg files are allowed', HttpStatus.FORBIDDEN), false);
  }
  callback(null, true);
}

export const mediaFilesInter = (_req, file, callback) => {
  if (file && !file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx)$/)) {
    return callback(new HttpException('Only jpeg|jpg|png|svg files are allowed', HttpStatus.FORBIDDEN), false);
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
