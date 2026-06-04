import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Modal } from "flowbite-react";

import { faChevronDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useMyUser } from "../../../context/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Check } from "lucide-react";

import { toast } from "sonner";

export default function EditStoresModal ({ openModal, setOpenModal }) {
    const {myStores, setMyStores, myUser, setSelectedStore, selectedStore} = useMyUser();
    const [currentStore, setCurrentStore] = useState({
        store_id: "",
        store_name: "",
        store_street: "",
        store_city: "",
        store_state: "",
        store_zip: "",
    })

    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleStoreSelection = (value) => {
        if (value === "new") {
    setCurrentStore({
      store_id: "",
      store_name: "",
      store_street: "",
      store_city: "",
      store_state: "",
      store_zip: "",
    });
    return;
  }

  const store = myStores.find(
    (s) => String(s.store_id) === String(value)
  );

  if (store) {
    setCurrentStore(store);
  }
    }

   const handleDeleteStore = async (storeId) => {
        try {
            setIsDeleting(true);

            const res = await fetch("/api/deleteStore", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ store_id: storeId }),
            });

            if (!res.ok) throw new Error();

            toast.success("Store deleted successfully", {
            className: "!bg-neutral-beige-light !text-text-dark",
            duration: 5000,
            });

           

            setMyStores((prev) =>
            prev.filter((store) => store.store_id !== storeId)
            );

            setCurrentStore({
            store_id: "",
            store_name: "",
            store_street: "",
            store_city: "",
            store_state: "",
            store_zip: "",
            });

             if (selectedStore?.store_id === storeId) {
              setSelectedStore(myStores.length > 1 ? myStores.find((s) => s.store_id !== storeId) : null);
            }

        } catch (err) {
            toast.error("Failed to delete store", {
            className: "!bg-neutral-beige-light !text-text-dark",
            duration: 5000,
            });
        } finally {
            setIsDeleting(false);
        }
        };

    const isFormValid =
    currentStore.store_name.trim() &&
    currentStore.store_street.trim() &&
    currentStore.store_city.trim() &&
    currentStore.store_state.trim() &&
    currentStore.store_zip.trim();

    const isNewStore = !currentStore.store_id;

    return (
        <Modal show={openModal} size="3xl" onClose={() => setOpenModal(false)} popup>
            <Modal.Header>
                <p className="font-bold p-2 text-secondary-dark">Manage Stores</p>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-row gap-4 pb-3">
                <Label>Select Store or Add a New Store</Label>

                    <DropdownMenu className="w-full">
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between bg-white border rounded">
                            {currentStore.store_name || "--Add New Store--"} <FontAwesomeIcon icon={faChevronDown} />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-white shadow border border-text rounded">
                        <DropdownMenuItem
                        onClick={() =>
                            setCurrentStore({
                            store_id: "",
                            store_name: "",
                            store_street: "",
                            store_city: "",
                            store_state: "",
                            store_zip: "",
                            })
                        }
                        className="flex cursor-pointer gap-2 hover:bg-muted w-full h-full rounded p-1 items-center"
                        >
                            -- Add New Store --
                        </DropdownMenuItem>

                        {myStores?.map((store) => (
                        <DropdownMenuItem
                            key={store.store_id}
                            onClick={() => setCurrentStore(store)}
                            className="flex cursor-pointer gap-2 hover:bg-muted w-full h-full rounded p-1 items-center"
                        >
                            {store.store_name}
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>

                    {!isNewStore ? 
                      <Button
                        onClick={() => handleDeleteStore(currentStore.store_id)}
                        disabled={isDeleting}
                        className="text-destructive bg-white hover:bg-muted flex items-center justify-center"
                        >
                        {isDeleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <FontAwesomeIcon icon={faTrash} />
                        )}
                        </Button>
                    :

                            <Button
                            disabled={!isFormValid}
                            className="bg-primary hover:bg-primary-dark text-neutral-blue-light text-center"
                            onClick={async () => {
                                try {
                                    setIsAdding(true);

                                    const res = await fetch("/api/addStore", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        newName: currentStore.store_name,
                                        newStreet: currentStore.store_street,
                                        newCity: currentStore.store_city,
                                        newState: currentStore.store_state,
                                        newZip: currentStore.store_zip,
                                        newID: myUser.user_id,
                                    }),
                                    });

                                    if (!res.ok) throw new Error();

                                    const newStore = await res.json();

                                    setMyStores((prev) => [...prev, newStore]);
                                    setCurrentStore(newStore);

                                    toast.success("Store added successfully", {
                                    className: "!bg-neutral-beige-light !text-text-dark",
                                    duration: 5000,
                                    });
                                } catch (err) {
                                    toast.error("Failed to add store", {
                                    className: "!bg-neutral-beige-light !text-text-dark",
                                    duration: 5000,
                                    });
                                } finally {
                                    setIsAdding(false);
                                }
                                }}
                            >
                              {isAdding ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    Add
                                    </>
                                )}
                            </Button>}
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="storeName">Store Name</Label>
                        <Input
                        id="storeName"
                        value={currentStore.store_name}
                        onChange={(e) =>
                            setCurrentStore({
                            ...currentStore,
                            store_name: e.target.value,
                            })
                        }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storeZip">Zip Code</Label>
                        <Input
                        id="storeZip"
                        value={currentStore.store_zip}
                        onChange={(e) =>
                            setCurrentStore({
                            ...currentStore,
                            store_zip: e.target.value,
                            })
                        }
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="storeStreet">Street Address</Label>
                        <Input
                        id="storeStreet"
                        value={currentStore.store_street}
                        onChange={(e) =>
                            setCurrentStore({
                            ...currentStore,
                            store_street: e.target.value,
                            })
                        }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storeCity">City</Label>
                        <Input
                        id="storeCity"
                        value={currentStore.store_city}
                        onChange={(e) =>
                            setCurrentStore({
                            ...currentStore,
                            store_city: e.target.value,
                            })
                        }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>State</Label>

                     <select
                        value={currentStore.store_state}
                        onChange={(e) =>
                            setCurrentStore({
                            ...currentStore,
                            store_state: e.target.value,
                            })
                        }
                        className="w-full bg-white border border-gray-300 rounded-md p-1 text-sm"
                        >
                        <option value="" disabled>
                            Select State
                        </option>

                        <option value="New York" className="hover:bg-muted text-sm">
                            New York
                        </option>
                        <option value="New Jersey" className="hover:bg-muted text-sm">
                            New Jersey
                        </option>
                        </select>
                        </div>
                    </div>
                    </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpenModal(false)} className="bg-muted hover:bg-muted-dark text-text-dark border border-text-dark">
                    Close
                </Button>
                <Button
                    disabled={!isFormValid || isNewStore}
                   onClick={async () => {
                        try {
                            setIsSaving(true);

                            const res = await fetch("/api/editStore", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(currentStore),
                            });

                            if (!res.ok) throw new Error();

                            const updatedStore = await res.json();

                            setMyStores((prev) =>
                            prev.map((store) =>
                                store.store_id === updatedStore.store_id
                                ? updatedStore
                                : store
                            )
                            );

                            if (selectedStore?.store_id === updatedStore.store_id) {
                                setSelectedStore(updatedStore);
                            }

                            toast.success("Store updated successfully", {
                            className: "!bg-neutral-beige-light !text-text-dark",
                            duration: 5000,
                            });
                        } catch (err) {
                            toast.error("Failed to update store", {
                            className: "!bg-neutral-beige-light !text-text-dark",
                            duration: 5000,
                            });
                        } finally {
                            setIsSaving(false);
                        }
                        }}
                    className="bg-primary hover:bg-primary-dark text-neutral-blue-light"
                    >
                      {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>

            </Modal.Footer>
        </Modal>
    )
}