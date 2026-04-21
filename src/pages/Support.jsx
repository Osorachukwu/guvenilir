import React from 'react'
import Banner from '../components/ui/Banner'
import { Mail, MailOpen, MapPin, Phone } from 'lucide-react'

export default function Support() {
  return (
    <div>
      <Banner />
      <div class="grid lg:grid-cols-2 items-start gap-16 p-6 mx-2 sm:mx-auto max-w-5xl max-lg:max-w-2xl bg-base-300 rounded-md my-20 shadow-md">
        <div>
          <h2 class="text-3xl font-bold">Let's Talk</h2>
          <p class="text-[15px] mt-4 leading-relaxed">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project  and provide help.</p>
          {/* email and location */}
          <div className='mt-6 sm:mt-8 space-y-6 sm:space-y-8'>
            <div>
              <h2 class="text-base font-semibold">Email</h2>
              <ul class="mt-4">
                <li class="flex items-center">
                  <div class="bg-base-100 h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center shrink-0">
                    <Mail />
                  </div>
                  <a href="javascript:void(0)" class="text-sm ml-4">
                    <small class="block">Mail</small>
                    <spane class="font-semibold">info@example.com</spane>
                  </a>
                </li>
              </ul>
            </div>
            {/*  */}
            <div>
              <h2 class="text-base font-semibold">Visit Us</h2>
              <ul class="mt-4">
                <li class="flex items-center">
                  <div class="bg-base-100 h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center shrink-0">
                    <MapPin />
                  </div>
                  <a href="javascript:void(0)" class="text-sm ml-4">
                    <small class="block">Address</small>
                    <spane class="font-semibold">11 Tawari Street, Mount Eden, Auckland, 1024 , New Zealand</spane>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form class="lg:ml-auto space-y-4 w-full">
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
            class="btn btn-lg btn-bloc text-base btn-primary">Send message</button>
        </form>
      </div>
    </div>
  )
}
