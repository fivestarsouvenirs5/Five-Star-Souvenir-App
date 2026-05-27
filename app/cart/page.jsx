"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useMyUser } from "../context/userContext";
import OrderButton from "../components/orderButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {faPencil} from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Plus, Minus, Store, ShoppingCart } from "lucide-react";

const CartItem = ({ entry, incrementItem, decrementItem, removeItem }) => {
  const pack = entry.product_data?.product_qty ?? 1;

  const inc = () => incrementItem(entry.id, { count: pack });
  const dec = () => entry.quantity - pack <= 0 ? removeItem() : decrementItem(entry.id, { count: pack });

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-5">
      <Image
        src={entry.product_data.image_url}
        alt={entry.name}
        width={200}
        height={200}
        className="w-full sm:w-[180px] h-[160px] sm:h-[180px] object-contain bg-white border rounded-xl"
      />

      <div className="flex-1 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-secondary-dark">
            {entry.name}{entry.product_data.size ? ` ~ ${entry.product_data.size}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{entry.product_data?.category}</p>
          {entry.product_data?.subcategory && <p className="text-sm text-muted-foreground">{entry.product_data.subcategory}</p>}
        </div>

       <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">

            {/* QTY (FIXED WIDTH NOW) */}
            <div className="flex items-center border rounded-lg overflow-hidden bg-white h-10 w-fit">
                <button onClick={dec} className="w-10 h-full flex items-center justify-center hover:bg-muted">
                <Minus className="w-4 h-4" />
                </button>

                <div className="w-12 flex items-center justify-center border-x text-sm font-medium">
                {entry.quantity}
                </div>

                <button onClick={inc} className="w-10 h-full flex items-center justify-center hover:bg-muted">
                <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end sm:justify-start gap-2">
                
                <div className="text-left sm:text-right leading-tight">
                <p className="text-base font-normal">{entry.formattedPrice}</p>
                <p className="text-xs text-muted-foreground">per item</p>
                </div>

                <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem()}
                className="ml-auto sm:ml-0"
                >
                <Trash2 className="w-5 h-5 text-destructive" />
                </Button>
            </div>

            </div>
      </div>
    </div>
  );
};

const YourOrder = ({ formattedTotalPrice, selectedStore, setEditingStore, setSelectedStore, myStores, editingStore, loadingStore }) => (
 <Card className="w-full lg:sticky lg:top-6 self-start bg-neutral-beige-light border shadow">
    <CardHeader><CardTitle className="flex gap-2 items-center"><Store className="w-5 h-5" />Your Order</CardTitle></CardHeader>

    <CardContent className="space-y-6 py-4">
        <div className="flex flex-row gap-5 items-center">
      {loadingStore ? <div className="space-y-2 animate-pulse"><div className="h-5 w-40 bg-muted rounded" /><div className="h-10 w-full bg-muted rounded" /></div> :
      <>
        <div>
          <p className="font-semibold">{selectedStore?.store_name}</p>
          <p className="text-sm text-muted-foreground">{selectedStore?.store_street}</p>
          <p className="text-sm text-muted-foreground">{selectedStore?.store_city}, {selectedStore?.store_state} {selectedStore?.store_zip}</p>
        </div>
        </>
    }
     {editingStore ? (
        <div className="flex justify-end">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto bg-neutral-beige-light">
                    <FontAwesomeIcon
                        icon={faChevronDown}
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-48 p-4 bg-white">
                {myStores.map((s) => (
                <DropdownMenuItem
                    key={s.store_id}
                    onClick={() => setSelectedStore(s)}
                    className="p-1 rounded hover:bg-muted cursor-pointer"
                >
                    {s.store_name}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        ): <Button variant="outline" size="icon" className="bg-text-light text-neutral-beige-light p-1 rounded-sm" onClick={() => setEditingStore(true)}><FontAwesomeIcon icon={faPencil} /></Button>}
      </div>
      {editingStore ?  <Button className=" bg-primary-light text-neutral-blue-light hover:bg-primary-dark"  onClick={() => setEditingStore(false)}>Confirm</Button> : null}
  

      <hr />

      <div className="flex justify-between items-center">
        <p className="text-lg text-text-dark">Total</p>
        <p className="text-2xl sm:text-3xl font-bold text-text-dark">{formattedTotalPrice}</p>
      </div>

      <OrderButton page={true} />
    </CardContent>
  </Card>
);

export default function CartPage() {
  const { cartDetails, incrementItem, decrementItem, removeItem, formattedTotalPrice, clearCart } = useShoppingCart();
  const { myUser, isSignedIn, selectedStore, myStores, setSelectedStore } = useMyUser();

  const [editingStore, setEditingStore] = useState(false);
  const [loadingStore, setLoadingStore] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { if (selectedStore) setLoadingStore(false); }, [selectedStore]);
  if (!isSignedIn || myUser?.user_metadata?.adminapproval !== "true") return null;

  const cartEntries = Object.values(cartDetails ?? {});
  const confirmDelete = () => { removeItem(deleteTarget.id); setDeleteTarget(null); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        <div className="lg:col-span-2 bg-neutral-beige-light border shadow rounded-xl p-4 sm:p-6 lg:p-8">
         <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <h1 className="text-2xl sm:text-3xl font-bold">Your Cart</h1>
            </div>

            {cartEntries.length > 0 && (
                <Button
                variant="outline"
                onClick={clearCart}
                className="text-sm bg-white hover:bg-secondary text-secondary hover:text-white"
                >
                Clear Cart
                </Button>
            )}
            </div>

          {cartEntries.length === 0 ? (
            <div className="py-16 sm:py-20 text-center">
              <ShoppingCart className="w-12 h-12 sm:w-14 sm:h-14 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Your cart is empty.</p>
            </div>
          ) : (
            cartEntries.map((entry, i) => (
              <div key={entry.id}>
                <CartItem
                  entry={entry}
                  incrementItem={incrementItem}
                  decrementItem={decrementItem}
                  removeItem={() => setDeleteTarget(entry)}
                />
                {i !== cartEntries.length - 1 && <hr />}
              </div>
            ))
          )}
        </div>

        <YourOrder
          formattedTotalPrice={formattedTotalPrice}
          selectedStore={selectedStore}
          setEditingStore={setEditingStore}
          setSelectedStore={setSelectedStore}
          myStores={myStores}
          editingStore={editingStore}
          loadingStore={loadingStore}
        />
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent showCloseButton={false} className="max-w-sm sm:max-w-sm bg-white rounded-md shadow-2xl border border-text">
          <DialogHeader><DialogTitle>Remove item?</DialogTitle></DialogHeader>

          {deleteTarget && (
            <div className="flex gap-4 items-center py-4">
              <Image src={deleteTarget.product_data.image_url} alt={deleteTarget.name} width={60} height={60} className="rounded border object-contain" />
              <div>
                <p className="font-medium">{deleteTarget.name}</p>
                <p className="text-sm text-muted-foreground">{deleteTarget.product_data?.category}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" className="bg-muted text-muted-foreground hover:bg-muted/80" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="outline" className="bg-destructive text-destructive-foreground hover:bg-destructive/80" onClick={confirmDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}