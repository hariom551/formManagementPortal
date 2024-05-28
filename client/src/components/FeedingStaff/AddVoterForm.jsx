import React, { useRef, useState, useCallback } from 'react'
import { Religion, Occupation } from '../Pages/Constaint.jsx';
import { ValidationPage } from './Validation.jsx';
import Webcam from 'react-webcam-v2'
const AddVoterForm = () => {

  const [Age, setAge] = useState('')
  const [DOB, setDob] = useState('')
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  // picture capture by webcam
  const webref = useRef(null)
  const capturePic = useCallback(
    () => {
      const imageSrc = webref.current.getScreenshot();
      setImage(imageSrc)
    },
    [webref]
  );
  const [rows, setRows] = useState([{ id: 0 }]);
  const [data, setData] = useState({
    RefId: '',
    COId1: '',
    COId2: '',
    COId3: '',
    COId4: '',
    COId5: '',
    EFName: '',
    HFName: '',
    ELName: '',
    HLName: '',
    RType: '',
    ERFName: '',
    HRFName: '',
    ERLName: '',
    HRLName: '',
    CasteId: "",
    ECaste: '',
    Qualification: '',
    Occupation: '',
    Age: '',
    DOB: '',
    Sex: '',
    MNo: '',
    MNo2: '',
    AadharNo: '',
    VIdNo: '',
    GCYear: '',
    AreaId: '',
    TehsilId: '',
    CounId: '',
    VSId: '',
    WBId: '',
    ChkBlkId: '',
    HNo: '',
    Landmark: '',
    Document1: '',
    Document2: '',
    Document3: '',
    VImage: '',
    Remarks: '',
    StaffId: '',
  })

  // set Value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
    setErrors(ValidationPage(data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log(data.DOB)
    } catch (error) {
      console.log(error)
    }
  }

  let handleCheckboxClick = (index) => {
    setRows((prev) => {
      if (index === prev.length - 1 && prev.length < 5) {
        return [...prev, { id: prev.length }]
      }
      else {
        return prev.filter((row, i) =>
          i !== index

        )
      }
    })

  }

  const fixedDate = new Date('2024-01-01');

  const handleChangeDob = async (e) => {
    const dobValue = e.target.value;
    const dob = new Date(dobValue);

    if (fixedDate < dob) {
      setError('DOB cannot be in the future.');
    } else {
      const yearDiff = fixedDate.getFullYear() - dob.getFullYear();
      const monthDiff = fixedDate.getMonth() - dob.getMonth();
      const dayDiff = fixedDate.getDate() - dob.getDate();

      let ageYear = yearDiff;
      let ageMonth = monthDiff;
      let ageDay = dayDiff;

      if (ageDay < 0) {
        ageMonth -= 1;
        const lastMonth = new Date(fixedDate.getFullYear(), fixedDate.getMonth(), 0);
        ageDay += lastMonth.getDate();
      }
      if (ageMonth < 0) {
        ageYear -= 1;
        ageMonth += 12;
      }

      const totalAgeInYears = ageYear + (ageMonth / 12) + (ageDay / 365);

      if (totalAgeInYears < 18) {
        setError('You are not eligible because you are under 18.');

      } else {
        setError('');
        setDob(dobValue);
        setAge(`${ageYear} years ${ageMonth} months ${ageDay} days`);
      }
    }
  };
  // age sdkfpkdspfpspfkspkfpdskp
  const handleChangeAge = async (e) => {
    const ageValue = e.target.value;
    setAge(ageValue)
    if (ageValue < 18) {
      setError('You are not eligible because you are under 18.');

    } else {
      setError('')
      const prevAge = new Date(fixedDate.getFullYear() - ageValue, fixedDate.getMonth(), fixedDate.getDate())
      const dateymdFormat = prevAge.toISOString().split('T')[0]
      setDob(dateymdFormat)
    }


    // console.log(dateymdFormat)
  }

  return (

    <>
      <form action="" onSubmit={handleSubmit}>
        <div className='w-[90%]  h-[full] mx-auto my-5 px-8 py-5 bg-gray-100 ' style={{ boxShadow: "0 0 5px 1px #ddd" }}>
          <div className="container-fluid flex-col gap-2 flex">
            <div className='flex items-center justify-between py-3 text-black'>
              <div className='text-xl'>Reference Details</div>
              <div className='flex items-center w-[28vw] justify-between '>
                <p className='select-none text-sm'>Today's Form=0</p>
                <p className='select-none text-sm'><sup>*</sup>fields are required</p>
              </div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-md-3 flex-col gap-2 flex ">
                <label htmlFor="" className=''>Packet No.</label>
                <div className='flex gap-2 items-center '>
              
                  <input type="text" name="PacketNo" id="" value={data.PacketNo}
                    className='outline-none border w-full px-2' placeholder='Packet No' />
                </div>
              </div>
              <div className="col-md-9"></div>
            </div>
            {/* mobile volinteer  setion start*/}
            <div className="row flex my-2">
              <div className="col-md-3 flex-col gap-2 flex mt-1">
                <label htmlFor="" className=''>Mobile 1 </label>
                <div className='flex gap-2 items-center '>
                  <input type="text" name="MBActive" id="" value={data.MBActive}
                    className='outline-none border w-full px-2' placeholder='Enter Mobile 1' />
                </div>
              </div>
              <div className="col-md-3 flex-col gap-2 flex mt-1">
                <label htmlFor="" className=''>Volunteer (Hindi)</label>
                <div className='flex gap-2 items-center '>

                  <input type="text" name="" id="" className='outline-none border w-full px-2' placeholder='Enter Volunteer Name' />
                </div>
              </div>
              <div className="col-md-3 flex-col gap-2 flex mt-1">
                <label htmlFor="" className=''>Volunteer (English)</label>
                <div className='flex gap-2 items-center '>

                  <input type="text" name="VSId" id="" value={data.VSId}
                    className='outline-none border w-full px-2' placeholder='Enter Volunteer Name' />
                </div>
              </div>
              <div className="col-md-3 flex-col gap-2 flex mt-1 ">
                <label htmlFor="" className=''>Mobile 2</label>
                <div className='flex gap-2 items-center '>

                  <input type="text" name="" id="" className='outline-none px-2 border  w-full' placeholder='Enter Mobile 2' />
                </div>
              </div>
            </div>
            {/* mobile volinteer  setion end*/}
            {/* Address section start */}
            <div className="row flex my-2">
              <div className="col-md-6 flex-col gap-2 flex mt-1">
                <label htmlFor="" className=''>Address (English) </label>
                <div className='flex gap-2 items-center '>

                  <input type="text" name="AddressRemark" id="" value={data.AddressRemark}
                    className='outline-none border w-full px-2' placeholder='Enter Address' />
                </div>
              </div>
              <div className="col-md-6 flex-col gap-2 flex mt-1">
                <label htmlFor="" className=''>Address (Hindi)</label>
                <div className='flex gap-2 items-center '>

                  <input type="text" name="" id="" className='outline-none border w-full px-2' placeholder='Enter Address' />
                </div>
              </div>

            </div>
            {/* Address section end */}
            {/* care of  section start */}


            {
              rows.map((row, index) => (
                <div className="row flex my-2 " key={row.id} >
                  <div className="col-md-3 flex-col gap-2 flex mt-1">
                    <label htmlFor="" className=''>CareOf Mobile {index + 1} </label>
                    <div className='flex gap-2 items-center '>
                      <input type="text" className='outline-none border w-full px-2' placeholder={`Enter CareOf Mobile ${index + 1}`} />
                    </div>
                  </div>
                  <div className="col-md-3 flex-col gap-2 flex mt-1">
                    <label htmlFor="" className=''>CareOf Name {index + 1} (Hindi)</label>
                    <div className='flex gap-2 items-center '>
                      <input type="text" name="" id="" className='outline-none border w-full px-2' placeholder={`Enter CareOf Name ${index + 1}`} />
                    </div>
                  </div>
                  <div className="col-md-3 flex-col gap-2 flex mt-1">
                    <label htmlFor="" className=''>CareOf Name {index + 1}(English)</label>
                    <div className='flex gap-2 items-center '>
                      <input type="text" name="" id="" className='outline-none border w-full px-2' placeholder={`Enter CareOf Name ${index + 1}`} />
                    </div>
                  </div>
                  {index < 4 && (
                    <div className="col-md-3 flex-col gap-2 flex mt-1 ">
                      <label htmlFor="" className=''>CareOf {index + 2}</label>
                      <div className='flex gap-2 items-center '>
                        <input type="checkbox" name="" id="" className='outline-none px-2 border ' onClick={() => handleCheckboxClick(index)} />
                        <p className='text-black'>Add CareOff</p>
                      </div>
                    </div>
                  )}

                </div>
              ))
            }
            {/* care of  section end */}
          </div>
          {/* second container */}

        </div>



        <div className='w-[90%]  h-[full] mx-auto my-5 px-8 py-5 bg-gray-100 ' style={{ boxShadow: "0 0 5px 1px #ddd" }}>
          <div className="container-fluid flex-col gap-2 flex">
            <div className='flex items-center justify-between py-3'>
              <div className='text-xl text-black'>Reference Details</div>
              <p className='select-none text-sm text-black'><sup>*</sup>fields are required</p>
            </div>
            <hr />
          </div>
          {/* name fields start */}
          <div className="row flex mt-5">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=' capitalize'>First Name (English) </label>
              <div className='flex gap-2 items-center '>

                <input type="text" name="EFName" value={data.EFName} onChange={handleChange} id=""
                  className='outline-none border w-full px-2' placeholder='First Name (English)' />
              </div>
              {errors.EFName && <p className='text-red-500 text-[.7rem]' style={{ color: 'red' }}>{errors.EFName}</p>}
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>First Name (Hindi)</label>
              <div className='flex gap-2 items-center '>

                <input type="text" name="HFName" value={data.HFName} onChange={handleChange} className='outline-none border w-full px-2' placeholder='First Name (Hindi)' />
              </div>

            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Last Name(English)</label>
              <div className='flex gap-2 items-center '>

                <input type="text" name="ELName" value={data.ELName} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Last Name(English)' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1 ">
              <label htmlFor="" className=''>Last Name (Hindi)</label>
              <div className='flex gap-2 items-center '>

                <input type="text" name="HLName" value={data.HLName} onChange={handleChange} className='outline-none px-2 border  w-full' placeholder='Last Name(Hindi)' />
              </div>
            </div>
          </div>
          {/* name fields end */}
          {/* Relation fields start */}
          <div className="row flex mt-5">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Relation </label>
              <div className='flex gap-2 items-center '>
                <select className='w-full py-[.1rem]' name="RType" value={data.RType} onChange={handleChange}>
                  <option value="">--select relation--</option>
                  {
                    Religion.map((c) => (
                      <>
                        <option key={c.value} value={c.value}>{c.name}</option>
                      </>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Rel. First Name (English)</label>
              <div className='flex gap-2 items-center '>

                <input type="text" name='ERFName' value={data.ERFName} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Rel. First Name (English)' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Rel. First Name (Hindi)</label>
              <div className='flex gap-2 items-center '>

                <input type="text" name="HRFName" value={data.HRFName} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Rel. First Name(Hindi)' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1 ">
              <label htmlFor="" className='pdateIncomingForm.'>Rel. Last Name (English)</label>
              <div className='flex gap-2 items-center '>

                <input type="text" name="ERLName" value={data.ERLName} onChange={handleChange} id="" className='outline-none px-2 border  w-full' placeholder='Rel. Last Name (English)' />
              </div>
            </div>
          </div>
          {/* Relation fields  end */}
          {/* cast qualification fields  start */}
          <div className="row flex mt-5">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Rel. Last Name (Hindi) </label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="HRLName" value={data.ERLName} onChange={handleChange} id="" className='outline-none border w-full px-2' placeholder='Rel. Last Name (Hindi)' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Caste</label>
              <div className='flex gap-2 items-center '>
                <select name="ECaste" value={data.ECaste} onChange={handleChange} id="" disabled="disabled" className='w-full py-[.1rem]'>
                  <option value="">Nothing Selected</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Qualification</label>
              <div className='flex gap-2 items-center '>
                <select name="Qualification" value={data.Qualification} onChange={handleChange} id="" className='w-full py-[.1rem]' >
                  <option value="">--Select Qualification--</option>
                  <option value="">Post Graduate</option>
                  <option value="">Graduate</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1 ">
              <label htmlFor="" className=''>Occupation</label>
              <div className='flex gap-2 items-center '>
                <select name="Occupation" value={data.Occupation} onChange={handleChange} id="" className='w-full p-[.1rem]'>
                  <option value="">--Select Occupation--</option>
                  {
                    Occupation.map((c) => (
                      <option key={c.value} value={c.value}>{c.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          {/* cast qualification fields  end */}
          {/* age dob gender  fields  strt */}
          <div className="row flex mt-5">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Age </label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="Age" value={Age} onChange={handleChangeAge} id="" className='outline-none border w-full px-2' placeholder='Enter age' />
              </div>

            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>DOB</label>
              <div className='flex gap-2 items-center '>

                <input type="date" name="DOB" value={DOB} onChange={handleChangeDob} className='outline-none border w-full px-2' placeholder='DOB' />
              </div>
              {error && <p className='text-red-500 text-[.7rem]' style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Gender</label>
              <div className='flex gap-2 items-center '>
                <select name="Sex" id="" className='w-full py-[.1rem]' value={data.Sex} onChange={handleChange} >
                  <option value="">--Select Gender--</option>
                  <option value="">Male</option>
                  <option value="">Female</option>
                  <option value="">Third Gender</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1 ">
              <label htmlFor="" className=''>Mobile No</label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="MNo" value={data.MNo} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Mobile No' />
              </div>
            </div>
          </div>
          {/* age dob gender  fields  end */}
          {/* Mobile adhar   fields  start */}
          <div className="row flex mt-5">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Mobile No.2 </label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="MNo2" value={data.MNo2} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Mobile No 2' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Aadhar No</label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="AadharNo"   inputMode="numeric"  pattern="\d{12}" value={data.AadharNo} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Aadhar No' />
              </div>
              {errors.AadharNo && <p className='text-red-500 text-[.7rem]' style={{ color: 'red' }}>{errors.AadharNo}</p>}
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>VoterId</label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="VIdNo" value={data.VIdNo} onChange={handleChange} className='outline-none border w-full px-2' placeholder='VoterId' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1 ">
              <label htmlFor="" className=''>Graduate Comp Year</label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="GCYear" value={data.GCYear} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Graduate Comp Year' />
              </div>
            </div>
          </div>
          {/* Mobile adhar   fields  end */}
          {/* Address    fields  start*/}
          <div className='flex items-center justify-between py-4'>
            <div className='text-xl  text-black'>Address Information</div>

          </div>
          <div className="row flex mt-3">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Area / Village</label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="AreaId" value={data.AreaId} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Area/Village' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Tehsil</label>
              <div className='flex gap-2 items-center '>
                <select name="TehsilId" value={data.TehsilId} onChange={handleChange} id="" disabled="disabled" className='w-full py-[.1rem] '>
                  <option value="">Nothing Selected</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Council</label>
              <div className='flex gap-2 items-center '>
                <select name="CounId" value={data.CounId} onChange={handleChange} id="" disabled="disabled" className='w-full py-[.1rem] '>
                  <option value="">Nothing Selected</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1 ">
              <label htmlFor="" className=''>VidhanSabha</label>
              <div className='flex gap-2 items-center '>
                <select name="VSId" value={data.VSId} onChange={handleChange} id="" disabled="disabled" className='w-full py-[.1rem] '>
                  <option value="">Nothing Selected</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row flex mt-5">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Ward / Block</label>
              <div className='flex gap-2 items-center '>
                <select name="WBId" value={data.WBId} onChange={handleChange} id="" disabled="disabled" className='w-full py-[.1rem] '>
                  <option value="">Nothing Selected</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Chak Block Type / Panchayat</label>
              <div className='flex gap-2 items-center '>
                <select name="ChkBlkId" value={data.ChkBlkId} onChange={handleChange} id="" disabled="disabled" className='w-full py-[.1rem] '>
                  <option value="">Nothing Selected</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>HNo</label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="HNo" value={data.HNo} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Area/Village' />
              </div>
            </div>

          </div>


          {/* Address    fields  end*/}
          {/* document    fields  start*/}
          <div className="row flex mt-5">
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Landmark </label>
              <div className='flex gap-2 items-center '>
                <input type="text" name="Landmark" id="" value={data.Landmark} onChange={handleChange} className='outline-none border w-full px-2' placeholder='Landmark' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Document 1</label>
              <div className='flex gap-2 items-center '>
                <input type="file" name="Document1" value={data.Document1} onChange={handleChange} className='outline-none w-full px-2' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1">
              <label htmlFor="" className=''>Document 2</label>
              <div className='flex gap-2 items-center '>
                <input type="file" name="Document2" value={data.Document2} onChange={handleChange} className='outline-none w-full px-2' />
              </div>
            </div>
            <div className="col-md-3 flex-col gap-2 flex mt-1 ">
              <label htmlFor="" className=''>Document 3</label>
              <div className='flex gap-2 items-center '>
                <input type="file" name="Document3" value={data.Document3} onChange={handleChange}
                  className='outline-none w-full px-2' />
              </div>
            </div>
          </div>
          {/* document    fields  end*/}
        </div>
        <div className='w-[90%]  h-[full] mx-auto my-5 px-8 py-5 bg-gray-100 ' style={{ boxShadow: "0 0 5px 1px #ddd" }}>
          <div className="container-fluid flex-col gap-2 flex">
            <div className='flex items-center justify-between py-3'>
              <div className='text-xl text-black'>Voter's Image</div>
              <p className='select-none text-sm'></p>
            </div>
            <hr />
            <div className="row border-2 mt-5">
              <div className="col-md-4 border-r-2">
                <div className='border-b-2'>
                  <p className='underline flex items-center justify-center text-black py-4'>Live Camara</p>

                </div>
                <div className='h-[40vh] flex items-center'>
                  <Webcam ref={webref} screenshotFormat="image/jpeg" />
                </div>
                <div className=' flex items-center justify-center py-2 border-t-2'>
                  <button className='btn btn-primary text-black' onClick={capturePic}>Capture</button>
                </div>
              </div>
              <div className="col-md-4 border-r-2">
                <div className='border-b-2'>
                  <p className='underline flex items-center text-black justify-center py-4'>Captured Picture</p>
                </div>
                <div className='h-[40vh]'>
                  {image && <img src={image} alt='captued' />}
                </div>
                <div className=' flex items-center justify-center py-2 border-t-2'>
                  <button className='btn  bg-blue-400 text-white'>Crop</button>
                </div>
              </div>
              <div className="col-md-4 border-r">
                <div className='border-b-2'>
                  <p className='underline flex items-center text-black justify-center py-4'>Preview Picture</p>
                </div>
                <div className='h-[40vh]'>

                </div>
                <div className='flex items-center justify-center py-2 border-t-2'>
                  <input type="file" name="" id="" />
                </div>
              </div>
            </div>
          </div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default AddVoterForm