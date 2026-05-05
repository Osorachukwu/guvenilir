import React, { useState } from 'react'
import { LogOut } from 'lucide-react'
import { logout } from '../utils/logout'

export default function LogoutButton({
  className = "btn btn-ghost btn-sm text-error gap-2",
  showIcon = true,
  children = "Logout",
  confirmLogout = false
}) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogout = () => {
    if (confirmLogout) {
      setShowConfirm(true)
    } else {
      logout()
    }
  }

  const handleConfirm = () => {
    setShowConfirm(false)
    logout()
  }

  return (
    <>
      <button
        type="button"
        onClick={handleLogout}
        className={className}
      >
        {showIcon && <LogOut size={16} />}
        {children}
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Logout</h3>
            <p className="py-4">Are you sure you want to log out of your account?</p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowConfirm(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleConfirm}
                type="button"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowConfirm(false)} type="button">close</button>
          </form>
        </dialog>
      )}
    </>
  )
}