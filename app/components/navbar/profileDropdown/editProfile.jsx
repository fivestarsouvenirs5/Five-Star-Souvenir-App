import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Modal } from "flowbite-react";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useMyUser } from "../../../context/userContext";

import { useState } from "react";

import { toast } from "sonner";

export default function EditProfileModal ({ openModal, setOpenModal, formData, setFormData }) {
    const {myUser, setMyUser} = useMyUser();
        
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            e.email = "Please enter a valid email";
        }

        if (!formData.phone || !/^[0-9]{10,15}$/.test((formData.phone || "").replace(/[^0-9]/g, ""))) {
            e.phone = "Please enter a valid phone number";
        }

        if (!formData.firstName?.trim()) e.firstName = "Required";
        if (!formData.lastName?.trim()) e.lastName = "Required";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handlePhotoUpload = (e) => {
        setIsUploadingImage(true);
        const file = e.target.files?.[0];

        if (!file){
            setIsUploadingImage(false);
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setFormData((prev) => ({
        ...prev,
        photo: imageUrl,
        photoFile: file,
        }));
        setIsUploadingImage(false);
    };

    const handleSave = async () => {
        if (!validate()) return;
    try {
        
        setIsSaving(true);


        const data = new FormData();

        data.append("user_id", formData.user_id);
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);
        data.append("phoneNumber", formData.phone);
        data.append("photo", formData.photoFile);



        const res = await fetch("/api/editProfile", {
        method: "PATCH",
        body: data,
        });

        if (!res.ok) {
            throw new Error("Failed");
        }
        const resData = await res.json();
        console.log("Response from editProfile API:", resData);
        setMyUser((prev) => ({
            ...prev,
            name: resData.name,
            given_name: resData.given_name,
            email: resData.email,
            picture: resData.picture,
            user_metadata: {
                ...prev.user_metadata,
                phonenumber: resData.user_metadata.phonenumber,
            },
        }));

        toast.success("Profile updated successfully",{
                            className: "!bg-neutral-beige-light !text-text-dark",
                            duration: 5000,
                        });
    } catch (err) {
        console.error(err);
        toast.error("Error updating profile. Please try again.", {
            className: "!bg-neutral-beige-light !text-text-dark",
            duration: 5000,
        });
    } finally {
        setIsSaving(false);
    }
    };

    const isFormComplete =
    formData.firstName?.trim() &&
    formData.lastName?.trim() &&
    formData.email?.trim() &&
    formData.phone?.trim();

    return (
    <Modal
        show={openModal}
        size="3xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Body className="p-0">
          <div className="bg-white rounded-lg p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-secondary-dark">
                Edit your profile
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-8">
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    First Name
                  </Label>

                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-12"
                    placeholder="First Name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>


                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Last name
                  </Label>

                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-12"
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>


                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Email
                  </Label>

                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12"
                    placeholder="Email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>


                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Phone number
                  </Label>

                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12"
                    placeholder="Phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-semibold">
                    Profile photo
                  </Label>
                </div>

                <Avatar className="w-52 h-52">
                    {isUploadingImage ? (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                            <Loader2 className="animate-spin text-white" />
                        </div>
                    ): ( <AvatarImage
                    src={formData.photo}
                    className="w-52 h-52 rounded-full object-cover"
                  />)}
                 

                  <AvatarFallback className="text-4xl">
                    {formData.firstName?.charAt(0)}
                    {formData.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <label htmlFor="photo-upload" className="w-full">
                    <div className="border rounded-md px-4 py-2 text-center cursor-pointer w-full hover:bg-muted flex items-center justify-center gap-2">
                        {isUploadingImage ? (
                            <>
                            Uploading...
                            </>
                        ) : (
                            <>
                            <FontAwesomeIcon icon={faCamera} />
                            Upload Photo
                            </>
                        )}
                    </div>
                </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
               
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-10">
              <Button
                variant="outline"
                onClick={() => { setFormData({
                                    firstName: myUser?.name || "",
                                    lastName: myUser?.given_name || "",
                                    email: myUser?.email || "",
                                    phone: myUser?.user_metadata.phonenumber || "",
                                    photo: myUser?.picture || "",
                                }); 
                                setOpenModal(false);
                             }}
              >
                Cancel
              </Button>

            <Button
                onClick={handleSave}
                disabled={isSaving || isUploadingImage || !isFormComplete}
                className="bg-primary hover:bg-primary-dark text-white min-w-[140px]"
                >
                {isSaving ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                    </>
                ) : (
                    "Save Changes"
                )}
                </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
}