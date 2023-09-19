import React from 'react'

export default function Loader() {
  return (
    <>
      <div className="loader absolute flex justify-center items-center w-full h-full inset-0">
        <div className="w-4 h-4 rounded-full bg-black mx-2"></div>
        <div className="w-4 h-4 rounded-full bg-black mx-2"></div>
        <div className="w-4 h-4 rounded-full bg-black mx-2"></div>
      </div>
    </>
  )
}
