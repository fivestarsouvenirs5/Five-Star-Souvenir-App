import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Trash2, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Modal } from 'flowbite-react';

export default function UserCard({ user, setRefresh }) {

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingApprove, setLoadingApprove] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        setLoadingDelete(true);

        try {
            const response = await fetch("/api/deletingUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.user_id,
                }),
            });

            if (!response.ok) {
                toast.error("Error deleting user.", {
                    className: "!bg-neutral-beige-light !text-text-dark",
                    duration: 5000,
                });
                return;
            }

            toast.success("User Deleted!", {
                className: "!bg-neutral-beige-light !text-text-dark",
                duration: 5000,
            });

            setOpen(false)

            setRefresh(prev => !prev);

        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error deleting User.", {
                className: "!bg-neutral-beige-light !text-text-dark",
                duration: 5000,
            });
        } finally {
            setLoadingDelete(false);
        }
    };

    const handleApprove = async () => {
        setLoadingApprove(true);

        try {
            const response = await fetch("/api/approvingUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.user_id,
                }),
            });

            if (!response.ok) {
                toast.error("Error approving user.", {
                    className: "!bg-neutral-beige-light !text-text-dark",
                    duration: 5000,
                });
                return;
            }

            toast.success("User Approved!", {
                className: "!bg-neutral-beige-light !text-text-dark",
                duration: 5000,
            });

            setRefresh(prev => !prev);

        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Error approving User.", {
                className: "!bg-neutral-beige-light !text-text-dark",
                duration: 5000,
            });
        } finally {
            setLoadingApprove(false);
        }
    };

    return (
        <>
            <Card className="bg-neutral-beige-light rounded-md shadow-md border relative">

                {/* ACTION BUTTONS */}
                {user.user_metadata.adminapproval === "true" ? (
                    <button
                        disabled={loadingDelete}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 hover:bg-gray-300 p-1 rounded transition-colors text-destructive disabled:opacity-50"
                        onClick={setOpen(true)}
                    >
                        {loadingDelete ? (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        ) : (
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                    </button>
                ) : (
                    <div className="absolute top-2 right-2 flex gap-2">
                        
                        {/* APPROVE */}
                        <button
                            disabled={loadingApprove}
                            className="p-1 rounded-md bg-green-500 hover:bg-green-300 disabled:opacity-50"
                            onClick={handleApprove}
                        >
                            {loadingApprove ? (
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                            ) : (
                                <Check className="w-5 h-5 text-white" />
                            )}
                        </button>

                        {/* DELETE */}
                        <button
                            disabled={loadingDelete}
                            className="p-1 rounded-md bg-destructive hover:bg-red-300 disabled:opacity-50"
                            onClick={handleDelete}
                        >
                            {loadingDelete ? (
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                            ) : (
                                <X className="w-5 h-5 text-white" />
                            )}
                        </button>

                    </div>
                )}

                <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-xl px-2 sm:px-3">
                        {user.name} {user.given_name}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-row gap-3 sm:gap-6 pb-3 sm:pb-4 px-2 sm:px-3 items-center">
                        <Avatar className="w-16 h-16 sm:w-24 sm:h-24">
                            <AvatarImage
                                src={user.picture}
                                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover"
                            />
                            <AvatarFallback className="text-sm sm:text-lg">
                                {user.name.charAt(0)}
                                {user.given_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-xs sm:text-lg">
                            <p>{user.stores[0]?.store_name}</p>
                            <p>{user.stores[0]?.store_street}</p>
                            <p>
                                {user.stores[0]?.store_city},{" "}
                                {user.stores[0]?.store_state}{" "}
                                {user.stores[0]?.store_zip}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 sm:gap-2 px-2 sm:px-3 text-xs sm:text-base">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <p className="break-all">{user.email}</p>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <p>{user.user_metadata.phonenumber}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
           <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Header>
                    Delete User
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Are you sure you want to delete {user.name} {user.given_name}?
                    </p>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => {
                                handleDelete();
                            }}
                            className="px-4 py-2 bg-primary text-white rounded hover:primary-dark"
                        >
                            Yes
                        </button>

                        <button
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            No
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}