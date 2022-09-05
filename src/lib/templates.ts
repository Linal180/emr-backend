import { toBuffer } from "bwip-js"
import { LabResultPayload } from "src/labs/dto/labTest-payload.dto";
import { formatAddress, formatPhone, getFormatDateString } from "./helper";

const getBuffer = async (url) => {
  return await toBuffer({
    bcid: 'code128',       // Barcode type
    text: url,    // Text to encode
    scale: 3,               // 3x scaling factor
    height: 10,              // Bar height, in millimeters
    includetext: true,            // Show human-readable text
    textxalign: 'center',
  })
}


export default async function template(labResultPayload: LabResultPayload, attachmentUrl: string) {
  const { doctor, facilityInfo, labTests, patientInfo } = labResultPayload
  const url = `${process.env.PORTAL_APP_BASE_URL}/lab-results-info/${labTests?.[0]?.orderNumber}`
  const urlBarCode = await getBuffer(url)
  const buffer = urlBarCode.toString('base64') // e.g., <Buffer 89 50 4e ... >

  const mimeType = 'image/png' // e.g., image/png

  const { collectedDate, receivedDate } = labTests?.[0] || {}
  const { firstName, lastName, dob, gender, patientRecord, contacts } = patientInfo || {}
  const primaryContact = contacts?.find((contact) => contact?.primaryContact)
  const { phone } = primaryContact || {}
  const { contacts: facilityContacts, name: facilityName, cliaIdNumber } = facilityInfo || {}
  const facilityPrimaryContact = facilityContacts?.find((facilityContact) => facilityContact?.primaryContact)
  const { phone: facilityPhone, address, city, state, zipCode } = facilityPrimaryContact || {}
  const { firstName: dFirstName, lastName: dLastName } = doctor || {}
  const doctorFullName = `${dFirstName} ${dLastName}`
  const patientFullName = `${firstName} ${lastName}`
  const diagnoses = labTests?.find((test) => test?.diagnoses?.[0]?.code)?.diagnoses

  return `
   <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AIMED</title>
</head>

<body>
  <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tbody>
      <!-- 1st row start -->
      <tr>
        <td align="center">
          <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="center" style="border:1px solid black">
                  <table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table class="col1" width="240" border="0" align="left" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td height="20"></td>
                              </tr>

                              <tr>
                                <td align="center">
                                  <img style="display:block; line-height:0px; font-size:0px; border:0px;width: 110px;" src=${attachmentUrl? attachmentUrl : "http://cdn.mcauto-images-production.sendgrid.net/22b202cae41dc874/55e5ba70-143f-49c3-9850-34089f655fd5/338x444.png"} alt="img" width="160" height="auto">
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table class="col3_one" width="360" border="0" align="right" cellpadding="0" cellspacing="0" style="border-left:1px solid black">
                            <tbody>
                              <tr align="left" valign="top">
                                <td
                                  style="font-size:12px;font-family:Arial,sans-serif; color:#ffffff; background-color: grey;text-align: center;padding: 10px; line-height:30px; font-weight: bold;">
                                  SPECIMEN
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;padding-left: 10px;width: 60px">
                                          Patient No:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 160px;max-width: 150px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${patientRecord}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;padding-left: 10px;width: 60px">
                                          Final Report:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 160px;max-width: 150px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;padding-left: 10px;width: 60px">
                                          Collected Date:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 160px;max-width: 150px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${collectedDate}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;padding-left: 10px;width: 60px">
                                          Received Date:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 160px;max-width: 150px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${receivedDate}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <!-- 1st row end -->

      <!-- 2nd row start -->
      <tr>
        <td align="center">
          <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="center" style="border-right:1px solid black;border-left:1px solid black;">
                  <table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table class="col11" width="260" border="0" align="left" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr align="left" valign="top">
                                <td
                                  style="font-size:12px;font-family:Arial,sans-serif; color:#ffffff; border-bottom: 1px solid black; background-color: grey;text-align: center;padding: 10px; line-height:30px; font-weight: bold;">
                                  PATIENT
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td style="padding-left: 5px">
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500; width: 50px;padding-left: 5px;">
                                          Name:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 180px;max-width: 170px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${patientFullName}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td style="padding-left: 5px">
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500; width: 50px;padding-left: 5px;">
                                          DOB:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 180px;max-width: 170px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${getFormatDateString(dob, 'MM-DD-YYYY')}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td style="padding-left: 5px">
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 50px;padding-left: 5px;">
                                          Gender:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 180px;max-width: 170px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${gender}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td style="padding-left: 5px">
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 50px;padding-left: 5px;">
                                          ID #:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 180px;max-width: 170px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${patientRecord}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td style="padding-left: 5px">
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 50px;padding-left: 5px;">
                                          Tel:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 180px;max-width: 170px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${formatPhone(phone)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table class="col3_one1" width="340" border="0" align="right" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr align="left" valign="top">
                                <td
                                  style="font-size:12px;font-family:Arial,sans-serif; color:#ffffff; border-bottom: 1px solid black; background-color: grey;text-align: center;padding: 10px; line-height:30px; font-weight: bold;">
                                  PHYSICIAN
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 70px;">
                                          Facility:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 210px;max-width: 200px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${facilityName}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 70px;">
                                          CLIA Number:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px; width: 210px;max-width: 200px;overflow: hidden;text-overflow: ellipsis; font-size:8px;font-family:Arial,sans-serif;">
                                          ${cliaIdNumber}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 70px;">
                                          Primary Care:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 210px;max-width: 200px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          Primary
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 70px;">
                                          Urgent Care:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 210px;max-width: 200px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          Primary
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 70px;">
                                          Attending:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 210px;max-width: 200px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          Dr. ${doctorFullName}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 70px;">
                                          Tel:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 210px;max-width: 200px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${formatPhone(facilityPhone)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td>
                                  <table class="col1" width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="font-size:10px;font-family:Arial,sans-serif; color:#000; line-height:24px; font-weight: 500;width: 70px;">
                                          Address:
                                        </td>

                                        <td style="background-color: #eeeeee;color: #000;padding:10px;width: 210px;max-width: 200px;overflow: hidden;text-overflow: ellipsis;font-size:8px;font-family:Arial,sans-serif;">
                                          ${formatAddress(address, city, state, zipCode)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td height="10"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <!-- 2nd row end -->

      <!-- 3rd row start -->
      <tr>
        <td align="center">
          <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="center" style="border-right:1px solid black;border-left:1px solid black;border-top: 1px solid black;">
                  <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                  <tbody>
                   <tr>
                      <td
                        style="font-size:12px;font-family:Arial,sans-serif; color:#ffffff; background-color: grey;text-align: center;padding: 10px; line-height:30px; font-weight: bold;">
                        DIAGNOSIS
                      </td>
                    </tr>
      
                    <tr>
                      <td align="center" style="background-color: #eeeeee;color: #000;padding:10px;min-width: 100%;max-width: 100%;overflow: hidden;text-overflow: ellipsis; font-size:8px;font-family:Arial,sans-serif;border-top: 1px solid black;">
                      ${diagnoses?.length ? diagnoses?.map((diagnose, i) => `${diagnose?.code} ${i !== (diagnoses.length - 1) ? '|' : ''} `) : ""}
                      </td>
                    </tr>
                  </tbody>
                </table></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <!-- 3rd row end -->

      <!-- 4th row start -->
      <tr>
        <td align="center">
          <table align="center" width="600" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="center" style="border:1px solid black;">
                  <table  width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table width="260" border="0" align="left" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr align="left" valign="top">
                                <td
                                  style="font-size:12px;font-family:Arial,sans-serif; color:#ffffff; background-color: grey;text-align: left;padding: 10px; border-bottom:1px solid black; line-height:30px; font-weight: bold;">
                                  TESTS
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                              <tr align="left" valign="top">
                                <td style="padding-left: 5px">
                                ${labTests?.map((test) => (
    `<table width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:8px; color:#000; line-height:24px; font-weight: 500;min-width: 100px;">
                                        ${test?.test?.component}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>`
  ))}
                                </td>
                              </tr>

                              
                              <tr>
                                <td height="10"></td>
                              </tr>
                            </tbody>
                          </table>

                          <table width="340" border="0" align="right" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr align="left" valign="top">
                                <td
                                  style="font-size:12px;font-family:Arial,sans-serif; color:#ffffff; background-color: grey;text-align: left;padding: 10px; border-bottom:1px solid black; line-height:30px; font-weight: bold;">
                                  RESULTS
                                </td>
                              </tr>

                              <tr>
                                <td height="10"></td>
                              </tr>

                                <tr align="left" valign="top">
                                  <td style="padding-left: 5px">
                                  ${labTests?.map((test) => (
    `<table " width="96%" style="padding-right: 5px" border="0" align="left" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td style="font-size:8px; color:#000; line-height:24px; font-weight: 500;min-width: 100px;">
                                          ${test?.testObservations?.[0]?.resultValue}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>`
  ))}
                                  </td>
                              </tr>
                              <tr>
                                <td height="10"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td height="10"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <!-- 4th row end -->

      <tr>
        <td height="60"></td>
      </tr>

      <!-- 5th row start -->
      <tr>
        <td align="center">
          <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="left" style="border:1px solid black;border-bottom: none;">
                  <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td
                          style="font-size:12px;font-family:Arial,sans-serif; color:#000; text-align: left;padding: 10px; line-height:20px; font-weight: bold;">
                          COMMENT:
                        </td>
                      </tr>
        
                      <tr>
                        <td align="left" style="color: #000;padding-left:10px;padding-right: 20px;padding-top: 0px;font-size:8px;font-family:Arial,sans-serif;line-height: 16px;">
                          The PKamp™ Respiratory SARS-CoV-2 RT-PCR Panel 1 is a real-time RT-PCR multiplexed test intended for the simultaneous qualitative detection and differentiation of SARS-CoV-2, influenza A, influenza B and/or respiratory syncytial virus (RSV) nucleic acid from nasopharyngeal swabs, anterior nasal swabs, and mid-turbinate swabs, collected from individuals suspected by a healthcare provider of having respiratory viral infection consistent with COVID-19. Symptoms of respiratory viral infection due to SARS-CoV-2, influenza, and RSV can be similar. Testing is limited to laboratories certified under the Clinical Laboratory Improvement Amendments of 1988 (CLIA), 42 U.S.C. § 263a, that meet requirements to perform high complexity tests. The PKamp™ Respiratory SARS-CoV-2 RT-PCR Panel is intended for use in the detection and differentiation of SARS-CoV-2, influenza A, influenza B, and/or RSV viral RNA in patient specimens, and is not intended to detect influenza C. RNA from SARS-CoV-2, influenza A, influenza B, and RSV viruses is generally detectable in upper respiratory specimens during the acute phase of infection.
                        </td>
                      </tr>

                      <tr>
                        <td align="left" style="color: #000;padding-left:10px;padding-right: 20px;padding-top: 10px;padding-bottom: 10px;font-size:8px;font-family:Arial,sans-serif;line-height: 16px;">
                          Positive results are indicative of active infection but do not rule out bacterial infection or coinfection with other viruses not detected by the test; clinical correlation with patient history and other diagnostic information is necessary to determine patient infection status. The agent detected may not be the definite cause of disease. Laboratories within the United States and its territories are required to report all SARS-CoV-2 results to the appropriate public health authorities. Negative PKamp™ Respiratory SARS-CoV-2 RT-PCR Panel 1 results do not preclude SARS-CoV-2, influenza A, influenza B, and/or RSV infection and should not be used as the sole basis for patient management decisions. Negative results must be combined with clinical observations, patient history, and/or epidemiological information.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <!-- 5th row end -->

      <!-- 6th row start -->
      <tr>
        <td align="center">
          <table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="left" style="border:1px solid black;">
                  <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td
                        style="font-size:8px;font-family:Arial,sans-serif; color:#000; text-align: left;padding: 10px; line-height:18px; font-weight: 600;">
                        ${facilityName}
                      </td>
                    </tr>
      
                    <tr>
                      <td
                        style="font-size:8px;font-family:Arial,sans-serif; color:#000; text-align: left;padding: 0 10px; line-height:18px; font-weight: 600;">
                        Tel: ${formatPhone(facilityPhone)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="font-size:8px;font-family:Arial,sans-serif; color:#000; text-align: left;padding: 10px; line-height:18px; font-weight: 600;">
                        ${formatAddress(address, city, state, zipCode)}
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="padding: 0 10px;">
                      <Image src="data:${mimeType};base64,${buffer}" style="max-width:100%"/>
                      </td>
                    </tr>
                  </tbody>
                </table></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <!-- 6th row end -->
      
    </tbody>
  </table>
</body>

</html>
  `;
};