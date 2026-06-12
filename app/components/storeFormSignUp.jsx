'use client';

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from "sonner";


export default function StoresForm({
    stores,
    setStores,
    submit,
    loading
}) {
    const [errors, setErrors] = useState({});

    const addStore = () => {
        setStores([
            ...stores,
            {
                name: '',
                street: '',
                city: '',
                state: '',
                zip: '',
            },
        ]);
    };

    const removeStore = (index) => {
        const updated = stores.filter((_, i) => i !== index);
        setStores(updated);
    };

    const updateStore = (index, field, value) => {
        const updated = [...stores];
        updated[index][field] = value;
        setStores(updated);

        setErrors((prev) => {
            const newErrors = { ...prev };
            if (!newErrors[index]) newErrors[index] = {};

            if (value.trim() === '') {
                newErrors[index][field] = 'This field is required';
            } else {
                delete newErrors[index][field];
            }

            return newErrors;
        });
    };

    const isValid = () => {
        return stores.every(
            (s) =>
                s.name.trim() &&
                s.street.trim() &&
                s.city.trim() &&
                s.state.trim() &&
                s.zip.trim()
        );
    };

    const handleSubmit = async () => {
        const newErrors = {};

        stores.forEach((s, i) => {
            newErrors[i] = {};

            if (!s.name.trim()) newErrors[i].name = 'Required';
            if (!s.street.trim()) newErrors[i].street = 'Required';
            if (!s.city.trim()) newErrors[i].city = 'Required';
            if (!s.state.trim()) newErrors[i].state = 'Required';
            if (!s.zip.trim()) newErrors[i].zip = 'Required';
        });

        setErrors(newErrors);

        if (!isValid()) {
            toast.error("Please fill out all Store Fields.", {
                className: "!bg-destructive !text-white",
                duration: 5000,
            });
            return;
        }

        try {
            await submit();
        } catch (err) {
            toast.error("Something went wrong please refresh and try again", {
                className: "!bg-destructive !text-white",
                duration: 5000,
        });
        }
    };

    return (
        <div className="py-2 space-y-4">
            <h1 className="text-lg font-bold">Add Store(s)</h1>

            <div className="space-y-6">
                {stores.map((store, index) => (
                    <div
                        key={index}
                        className="relative p-4 border border-text-light rounded-lg space-y-3 bg-white"
                    >
                        {stores.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeStore(index)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}

                        <p className="font-semibold pr-6">
                            {store.name !== ''
                                ? store.name
                                : `Store ${index + 1}`}
                        </p>

                        {/* NAME */}
                        <div>
                            <input
                                placeholder="Store Name"
                                value={store.name}
                                onChange={(e) =>
                                    updateStore(
                                        index,
                                        'name',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-text-light rounded-lg p-2"
                            />
                            {errors[index]?.name && (
                                <p className="text-red-500 text-sm">
                                    {errors[index].name}
                                </p>
                            )}
                        </div>

                        {/* STREET */}
                        <div>
                            <input
                                placeholder="Street Address"
                                value={store.street}
                                onChange={(e) =>
                                    updateStore(
                                        index,
                                        'street',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-text-light rounded-lg p-2"
                            />
                            {errors[index]?.street && (
                                <p className="text-red-500 text-sm">
                                    {errors[index].street}
                                </p>
                            )}
                        </div>

                        {/* CITY / STATE / ZIP */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                                <input
                                    placeholder="City"
                                    value={store.city}
                                    onChange={(e) =>
                                        updateStore(
                                            index,
                                            'city',
                                            e.target.value
                                        )
                                    }
                                    className="border border-text-light rounded-lg p-2 w-full"
                                />
                                {errors[index]?.city && (
                                    <p className="text-red-500 text-sm">
                                        {errors[index].city}
                                    </p>
                                )}
                            </div>

                            <div>
                                <select
                                    value={store.state}
                                    onChange={(e) =>
                                        updateStore(
                                            index,
                                            'state',
                                            e.target.value
                                        )
                                    }
                                    className="border border-text-light rounded-lg p-2 w-full"
                                >
                                    <option value="">
                                        Select State
                                    </option>
                                    <option value="New York">
                                        New York
                                    </option>
                                    <option value="New Jersey">
                                        New Jersey
                                    </option>
                                </select>

                                {errors[index]?.state && (
                                    <p className="text-red-500 text-sm">
                                        {errors[index].state}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    placeholder="Zip Code"
                                    value={store.zip}
                                    onChange={(e) =>
                                        updateStore(
                                            index,
                                            'zip',
                                            e.target.value
                                        )
                                    }
                                    className="border border-text-light rounded-lg p-2 w-full"
                                />
                                {errors[index]?.zip && (
                                    <p className="text-red-500 text-sm">
                                        {errors[index].zip}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                type="button"
                onClick={addStore}
                className="bg-neutral-beige-light border border-text hover:bg-muted"
            >
                + Add Another Store
            </Button>

            <Button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-primary text-white"
            >
                {loading ? "Loading..." : "Submit" }
            </Button>

               
        </div>
    );
}