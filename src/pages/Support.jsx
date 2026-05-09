import React from 'react'
import Banner from '../components/ui/Banner'
import { Mail, MailOpen, MapPin, Phone } from 'lucide-react'

export default function Support() {
  return (
    <div className='w-full overflow-x-hidden'>
      <Banner title="Support" />
      <div className="grid lg:grid-cols-2 items-start gap-16 p-6 mx-2 sm:mx-auto max-w-5xl max-lg:max-w-2xl bg-base-300 rounded-md my-20 shadow-md">
        <div>
          <h2 className="text-3xl font-bold">Let's Talk</h2>
          <p className="text-[15px] mt-4 leading-relaxed opacity-70">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project  and provide help.</p>
          {/* email and location */}
          <div className='mt-6 sm:mt-8 space-y-6 sm:space-y-8'>
            <div>
              <h2 className="text-base font-semibold">Email</h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                    <Mail />
                  </div>
                  <a href="javascript:void(0)" className="ml-4">
                    <small className="block opacity-70">Mail</small>
                    <spane className="font-semibold">support@glassdoorholding.com</spane>
                  </a>
                </li>
              </ul>
            </div>
            {/*  */}
            <div>
              <h2 className="text-base font-semibold">Call Us</h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                    {/* <MapPin /> */}
                    <Phone />
                  </div>
                  <a href="javascript:void(0)" className="ml-4">
                    <small className="block opacity-70">Phone</small>
                    <spane className="font-semibold">+447492218174</spane>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form className="lg:ml-auto space-y-4 w-full">
          <input type="text" className="input sm:input-lg validator w-full text-sm" required placeholder="Enter Name"
            pattern="[A-Za-z][A-Za-z\- ]*" minLength="3" maxLength="30" title="Only letters" />
          <p className="validator-hint hidden -mt-3">
            Must be 3 to 30 characters
            <br />containing only letters, numbers or dash
          </p>
          <input type="email" className="input sm:input-lg validator w-full text-sm" required placeholder="Enter Email" />
          <p className="validator-hint hidden -mt-3">Enter valid email address</p>

          <textarea className="textarea sm:textarea-md w-full" rows={9} placeholder="Bio" required></textarea>
          <button type='button'
            className="btn btn-bloc text-base btn-primary">Send message</button>
        </form>
      </div>
    </div>
  )
}
