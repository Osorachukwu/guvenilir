import React, { useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import axios from 'axios'
import StatusBadge from './StatusBadge'
import { BASE_URL, DOMAIN_KEY } from '../../utils/constants'
import TimedAlert from '../../components/ui/TimedAlert'

const avatarColors = ["bg-primary", "bg-success", "bg-warning", "bg-error", "bg-info"];

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
        return dateString;
    }
};

const UserCard = ({ user, onSuspend, onDelete }) => (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {user.fullname?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{user.fullname}</p>
                    <p className="text-xs text-base-content/40">@{user.username}</p>
                </div>
                <StatusBadge status={user.userStatus} />
            </div>
            <div className="text-xs text-base-content/50 space-y-1 mb-3">
                <p>{user.email}</p>
                <p>ID: {user.id} · Biz: {user.biz}</p>
                <p>Joined: {formatDate(user.date_created)}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={onSuspend}
                    id={`${user.userStatus === "suspended" ? "active_" + user.id : "suspended_" + user.id}`}
                    className={`btn btn-xs flex-1 ${user.userStatus === "suspended" ? "btn-outline btn-success" : "btn-outline btn-error"}`}
                    type="button"
                >
                    {user.userStatus === "suspended" ? "Unsuspend" : "Suspend"}
                </button>
                <button
                    onClick={onDelete}
                    className="btn btn-xs btn-outline btn-error flex-1"
                    type="button"
                >
                    <Trash2 size={12} />
                    Delete
                </button>
            </div>
        </div>
    </div>
);

export default function UsersTab({ users, onRefresh }) {
    const [search, setSearch] = useState("");
    const [confirmModal, setConfirmModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const [alert, setAlert] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [accountData, setAccountData] = useState({
        tid: "",
        action: "",
        whichAction: "",
        domainKey: DOMAIN_KEY
    });

    const filteredUsers = users.filter(u =>
        (u.fullname || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.username || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(search.toLowerCase())
    );

    // ────────── Suspend/Unsuspend ──────────
    const handleAccountAction = (e) => {
        let btnId = e.currentTarget.id;
        let btnIdSplite = btnId.split("_");
        let whichActionData = btnIdSplite[0];
        let tidData = btnIdSplite[1];

        const user = users.find(u => u.id == tidData);
        if (user) {
            setConfirmModal(user);
            setAccountData(prev => ({ ...prev, tid: tidData, action: "account", whichAction: whichActionData }));
        }
    };

    const handleSubmitAccountAction = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/action.php`, accountData);
            if (response.status === 200) {
                setConfirmModal(null);
                setAlert({ text: "User status updated successfully", type: "success" });
                onRefresh();
            }
        } catch (err) {
            setAlert({ text: "Failed to update user status", type: "error" });
        }
    };

    // ────────── Delete User ──────────
    const handleDeleteAction = (user) => {
        setDeleteModal(user);
    };

    const handleSubmitDelete = async () => {
        if (!deleteModal) return;

        try {
            setDeleting(true);
            const response = await axios.post(`${BASE_URL}/deleteuser.php`, {
                username: deleteModal.username,
                domainKey: DOMAIN_KEY
            });

            console.log("Delete response:", response.data);

            if (response.data.code === "200" || response.data.code === 200) {
                setAlert({ text: response.data.msg || "User deleted successfully", type: "success" });
                setDeleteModal(null);
                onRefresh();
            } else {
                setAlert({ text: response.data.msg || "Failed to delete user", type: "error" });
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            setAlert({ text: "Failed to delete user. Please try again.", type: "error" });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-4">
            {alert && <TimedAlert text={alert.text} type={alert.type} onClose={() => setAlert(null)} />}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-sm text-base-content/50 flex-1">{filteredUsers.length} of {users.length} users</p>
                <label className="input input-bordered input-sm flex items-center gap-2 w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 opacity-40 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by name, email, username…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="grow text-sm"
                    />
                </label>
            </div>

            {/* Mobile */}
            <div className="lg:hidden space-y-3">
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12 text-base-content/30 text-sm">No users found</div>
                ) : (
                    filteredUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onSuspend={handleAccountAction}
                            onDelete={() => handleDeleteAction(user)}
                        />
                    ))
                )}
            </div>

            {/* Desktop */}
            <div className="hidden lg:block card bg-gradient-to-br from-base-200 to-base-300 border border-base-300/50 shadow-md">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-xs text-base-content/40 uppercase tracking-wider bg-base-300/50">
                                <th>User</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, i) => (
                                <tr key={user.id} className="hover:bg-base-300/30 transition-colors">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                                {user.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <p className="font-medium text-sm">{user.fullname}</p>
                                        </div>
                                    </td>
                                    <td className="font-mono text-sm text-base-content/60">@{user.username}</td>
                                    <td className="text-sm text-base-content/50">{user.email}</td>
                                    <td className="text-xs text-base-content/50">{formatDate(user.date_created)}</td>
                                    <td><StatusBadge status={user.userStatus} /></td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button
                                                id={`${user.userStatus === "suspended" ? "active_" + user.id : "suspended_" + user.id}`}
                                                onClick={handleAccountAction}
                                                className={`btn btn-xs ${user.userStatus === "suspended" ? "btn-outline btn-success" : "btn-outline btn-error"}`}
                                                type="button"
                                            >
                                                {user.userStatus === "suspended" ? "Unsuspend" : "Suspend"}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAction(user)}
                                                className="btn btn-xs btn-outline btn-error"
                                                type="button"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ────────── Suspend/Unsuspend Confirm Modal ────────── */}
            {confirmModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Action</h3>
                        <p className="py-4">
                            Are you sure you want to {confirmModal.userStatus === "suspended" ? "unsuspend" : "suspend"} <strong>{confirmModal.fullname}</strong>?
                        </p>
                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setConfirmModal(null)} type="button">Cancel</button>
                            <button
                                className={`btn ${confirmModal.userStatus === "suspended" ? "btn-success" : "btn-error"}`}
                                onClick={handleSubmitAccountAction}
                                type="button"
                            >
                                {confirmModal.userStatus === "suspended" ? "Unsuspend.." : "Suspend"}
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setConfirmModal(null)} type="button">close</button>
                    </form>
                </dialog>
            )}

            {/* ────────── Delete Confirm Modal ────────── */}
            {deleteModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-error/10 p-2 rounded-xl">
                                <Trash2 className="h-5 w-5 text-error" />
                            </div>
                            <h3 className="font-bold text-lg">Delete User</h3>
                        </div>
                        <p className="text-sm text-base-content/60 mb-4">This action cannot be undone.</p>

                        {/* User Info */}
                        <div className="bg-base-100/50 rounded-xl p-4 mb-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-base-content/60">Name</span>
                                <span className="font-semibold">{deleteModal.fullname}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-base-content/60">Username</span>
                                <span className="font-mono font-semibold">@{deleteModal.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-base-content/60">Email</span>
                                <span className="text-sm">{deleteModal.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-base-content/60">Status</span>
                                <StatusBadge status={deleteModal.userStatus} />
                            </div>
                        </div>

                        <p className="text-sm text-error font-medium mb-4">
                            Are you sure you want to permanently delete <strong>{deleteModal.fullname}</strong>?
                            All associated data will be removed.
                        </p>

                        <div className="modal-action mt-0">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setDeleteModal(null)}
                                type="button"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={handleSubmitDelete}
                                type="button"
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <Trash2 size={16} />
                                )}
                                Delete User
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button onClick={() => setDeleteModal(null)} type="button">close</button>
                    </form>
                </dialog>
            )}
        </div>
    )
}