import { CheckCircle2, ChevronRight, Hourglass, X } from 'lucide-react'
import React from 'react'

export default function Contact() {
  return (
    <div>
      {/* <p className='Text-4xl font-semibold bg-gray-600 py-4 absolute z-50 w-full'>Welcom Admin</p> */}
      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {/* Avatar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">harthagerty@gmail.com</div>
            </div>
          </div>
          {/* Avatar */}
          <div className='flex gap-6'>
            <div className='card bg-base-300 w-1/3'>
              <div className='card-body'>
                <p>Deposit Status:</p>
                <div className='space-y-2 mt-4 ml-6'>
                  <div className='flex items-center gap-3 text-warning'>
                    <input type="radio" name="radio-1" className="radio radio-xs" />
                    <label htmlFor="" className='flex items-center gap-3'><Hourglass size={16} /> Pending</label>
                  </div>
                  <div className='flex items-center gap-3 text-success'>
                    <input type="radio" name="radio-1" className="radio radio-xs" />
                    <label htmlFor="" className='flex items-center gap-3'><CheckCircle2 size={16} /> Approved</label>
                  </div>
                  <div className='flex items-center gap-3 text-error'>
                    <input type="radio" name="radio-1" className="radio radio-xs" />
                    <label htmlFor="" className='flex items-center gap-3'><X size={16} /> Cancele</label>
                  </div>


                </div>
              </div>
            </div>
            {/* Withdrawal Status */}
            <div className='card bg-base-300 w-1/3'>
              <div className='card-body'>
                <p>Withdrawal Status:</p>
                <div className='space-y-2 mt-4 ml-6'>
                  <div className='flex items-center gap-3 text-warning'>
                    <input type="radio" name="radio-1" className="radio radio-xs" />
                    <label htmlFor="" className='flex items-center gap-3'><Hourglass size={16} /> Pending</label>
                  </div>
                  <div className='flex items-center gap-3 text-success'>
                    <input type="radio" name="radio-1" className="radio radio-xs" />
                    <label htmlFor="" className='flex items-center gap-3'><CheckCircle2 size={16} /> Approved</label>
                  </div>
                  <div className='flex items-center gap-3 text-error'>
                    <input type="radio" name="radio-1" className="radio radio-xs" />
                    <label htmlFor="" className='flex items-center gap-3'><X size={16} /> Cancele</label>
                  </div>


                </div>
              </div>
            </div>

          </div>



          <div className="modal-action">
            <form method="dialog" className='join space-x-2'>
              {/* if there is a button in form, it will close the modal */}
              <button className="join-item btn btn-sm btn-success">Save</button>
              <button className="join-item btn btn-sm btn-error">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Modal */}

      <div className="overflow-x-auto max-h-screen max-w-[85vw] mx-auto overflow-y-auto rounded-box border border-base-content/5 bg-base-300">
        <table className="table table-pin-rows">
          <thead >
            <tr className='bg-base-200'>
              <th>User</th>
              <th>Account Status</th>
              <th>Favorite Color</th>
              {/* <th>Details</th> */}
            </tr>
          </thead>
          <tbody>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(() => (
              <tr className='hover:bg-base-300' onClick={() => document.getElementById('my_modal_1').showModal()}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">harthagerty@gmail.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-success badge-sm">Active</span>
                </td>
                <td>Purple</td>
                {/* <td>
                  <button className="btn btn-square btn-ghost btn-xs"><ChevronRight /></button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

    </div>
  )
}


{/* Open the modal using document.getElementById('ID').showModal() method */ }
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog"> */}
{/* if there is a button in form, it will close the modal */ }
//         <button className="btn">Close</button>
//       </form>
//     </div>
//   </div>
// </dialog>

