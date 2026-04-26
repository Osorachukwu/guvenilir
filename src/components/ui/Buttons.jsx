import React from 'react'

export default function Buttons({btnText, btnStyle}) {
  return (
    <button className={`btn btn-primary ${btnStyle}`}>{btnText}</button>
  )
}
